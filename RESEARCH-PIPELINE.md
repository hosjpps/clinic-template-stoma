# Research Pipeline — Сбор данных по клинике

Документация процесса скрапинга всей публичной информации по клинике до начала разработки сайта. Применимо к любой мед.клинике в РФ.

Все шаги ниже выполняет AI (Claude / другой агент) через Playwright + Bash. Минимальный вход: название клиники + город ИЛИ Yandex Maps URL.

---

## 0. Входные данные (минимум)

Достаточно одного из:
- **Я.Карт URL** клиники (рекомендую — это золотой источник, оттуда тянем 80% данных)
- Название + город (агент сам найдёт через Google)
- Старый сайт (если есть)

Чем больше начальных входов — тем меньше угадывания.

---

## 1. Discovery — найти все источники

**Цель**: собрать список всех публичных страниц о клинике.

**Шаги:**
1. Google search: `"<название клиники>" <город> <ключевое слово специальности>` (например `"апекс" стоматология изюмская 39 бутово`).
2. Из результатов выгрести URL'ы по доменам:
   - `yandex.ru/maps/org/...` — главный источник
   - `2gis.ru/...` — рейтинг + услуги + доступная среда
   - `prodoctorov.ru/...` — врачи + стажи + квадратные фото
   - `zoon.ru/...` — backup отзывов
   - `docdoc.ru/...` — backup
   - `napopravku.ru/...` — backup
   - `instagram.com/...` — соцсети
   - VK / Telegram / Одноклассники — соцсети
   - Старый сайт клиники (домен типа `*.ru`)

**Реализация:**
```js
// Playwright on Google SERP
const links = Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
const filtered = links.filter(h =>
  h.includes('2gis') || h.includes('prodoctorov') || h.includes('napopravku') ||
  h.includes('docdoc') || h.includes('zoon') || h.includes('vk.com/') ||
  h.includes('instagram.com/') || /^https?:\/\/[^/]+\.ru\//.test(h)
);
```

**Сохранить в**: `research/sources.json` (массив URL).

---

## 2. Yandex Maps — главный источник

### 2.1 Organization page

URL: `https://yandex.ru/maps/org/<ID>/`

**Что вытащить:**
- Название
- Рейтинг (значение + кол-во голосов)
- Кол-во отзывов
- Награды («Хорошее место 2026», «Кешбэк 5%»)
- Телефон (актуальный, не со старого сайта)
- Адрес
- Часы работы
- Особенности — массив (детский кабинет, парковка, Wi-Fi, рассрочка, гарантия и т.д.)
- Услуги — список из секции «Витрина» и «Особенности»
- Способы оплаты
- Метро + минут пешком + расстояние
- Социальные сети если указаны

**Extract via JS:**
```js
const data = {
  title: document.title,
  rating: document.querySelector('[class*="business-rating-badge-view__rating-text"]')?.innerText,
  votes: document.body.innerText.match(/(\d+)\s*оцен/)?.[1],
  phones: document.body.innerText.match(/\+7[\s\-\(\)]*\d{3}[\s\-\(\)]*\d{3}[\s\-\(\)]*\d{2}[\s\-\(\)]*\d{2}/g),
  text: document.body.innerText.substring(0, 6000),
};
```

### 2.2 Reviews

URL: `https://yandex.ru/maps/org/<ID>/reviews/`

**Шаги (важно по порядку):**

1. Скроллить правый scroll-контейнер (Я.Карты — это SPA, lazy-load):
   ```js
   const sc = document.querySelector('[class*="scroll__container"]');
   let prev = 0;
   for (let i = 0; i < 60; i++) {
     sc.scrollTo(0, sc.scrollHeight);
     await new Promise(r => setTimeout(r, 600));
     if (sc.scrollHeight === prev) break;
     prev = sc.scrollHeight;
   }
   ```

2. Кликнуть все «ещё» (раскрытие длинных отзывов):
   ```js
   document.querySelectorAll('[class*="business-review-view__expand"]').forEach(b => b.click());
   ```

3. Использовать `itemprop` selectors (стабильнее чем CSS-классы Я.Карт):
   ```js
   const cards = Array.from(document.querySelectorAll('[class*="business-reviews-card-view__review"]'));
   const out = cards.map(card => ({
     author: card.querySelector('[itemprop="name"]')?.innerText.trim(),
     date: card.querySelector('[itemprop="datePublished"]')?.getAttribute('content'),  // ISO
     body: card.querySelector('[itemprop="reviewBody"]')?.innerText.trim(),
     rating: card.querySelector('meta[itemprop="ratingValue"]')?.getAttribute('content'),
   }));
   ```

4. Дедупликация по `author+date` (Я.Карты рендерит карточки в разные DOM-узлы).

**Сохранить в**: `research/reviews_yandex.json` со структурой `{ unique: N, reviews: [...] }`.

### 2.3 Фотогалерея

URL: `https://yandex.ru/maps/org/<ID>/gallery/`

**Шаги:**

1. Кликнуть на первую фотку — открывается lightbox/viewer:
   ```js
   document.querySelectorAll('.media-wrapper')[0]?.click();
   ```

2. Листать стрелками вправо, собирая `avatars.mds.yandex.net` URLs на каждом кадре:
   ```js
   const collected = new Set();
   for (let i = 0; i < 60; i++) {
     document.querySelectorAll('img').forEach(img => {
       if (img.src.includes('avatars.mds.yandex.net') && img.naturalWidth > 200) {
         collected.add(img.src);
       }
     });
     document.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', keyCode:39, bubbles:true}));
     await new Promise(r => setTimeout(r, 350));
   }
   ```

3. URLы оканчиваются `/M_height`, `/XXXL` — берём `XXXL` (максимальное разрешение).

4. Скачать локально:
   ```python
   for i, url in enumerate(urls):
     urllib.request.urlretrieve(url, f'research/images-yandex/yandex_{i:02d}.jpg')
   ```

**Сохранить в**: `research/photos_yandex.json` (URLs) + `research/images-yandex/*.jpg` (бинарники).

---

## 3. Старый сайт клиники

**Цель**: вытащить юр.реквизиты, фото врачей, прайс-листы.

### 3.1 Главная страница

```js
const data = {
  h1h2h3: Array.from(document.querySelectorAll('h1,h2,h3')).map(e => e.textContent.trim()),
  text: document.body.innerText.substring(0, 8000),
  links: Array.from(document.querySelectorAll('a[href]')).map(a => ({text: a.textContent.trim(), href: a.href})),
  images: Array.from(document.querySelectorAll('img')).map(img => img.src),
};
```

**Что искать в тексте:**
- ООО + название
- ИНН (10 или 12 цифр)
- Лицензия № (формат `ЛО-NN-NN-NNNNNN от DD.MM.YYYY`)
- Email — паттерн `[a-z]+@[a-z]+\.[a-z]+`
- Адрес — берём из ЯК если на сайте старый

### 3.2 Прайсы

Часто старые сайты раздают прайсы как `.xlsx` для скачивания:
```bash
curl -sL "https://site.ru/uploads/cats/terapiya.xlsx" -o research/prices/terapiya.xlsx
```

Парсить через `openpyxl` (Python) в JSON:
```python
import openpyxl, json
files=['terapiya','ortopediya','ortodontiya','parodontologiya','hirurgiya']
out={}
for f in files:
    wb=openpyxl.load_workbook(f+'.xlsx', data_only=True)
    rows = []
    for sh in wb.sheetnames:
        for r in wb[sh].iter_rows(values_only=True):
            row=[c for c in r if c is not None]
            if row: rows.append(row)
    out[f]=rows
json.dump(out, open('all_prices.json','w'), ensure_ascii=False, indent=2)
```

### 3.3 Фото клиники

Старые сайты держат фото в `/images/clinic/N.jpg` или `/uploads/...`:
```bash
for n in 1 2 3 4 5 6 7 8 9 10; do
  curl -sL "https://site.ru/images/clinic/$n.jpg" -o "research/images-old-site/clinic_$n.jpg"
done
```

### 3.4 Фото врачей

Обычно в `/uploads/service_big/<hash>.jpg`. Скачать всё.

**Проблема**: hash-имена не маппятся на ФИО. Решение:
- Каждое фото открыть, визуально определить (бейдж на халате часто содержит ФИО)
- Если бейджа нет — параллельно сравнить с Prodoctorov или сохранить как «doctor_unknown_N.jpg»

**Сохранить в**: `research/images-old-site/clinic_*.jpg`, `research/images-old-site/doctor_*.jpg`.

---

## 4. 2GIS

URL: `https://2gis.ru/<city>/firm/<ID>/tab/info`

**Что вытащить (чего нет на ЯК):**
- Доступная среда (пандус, подъёмник, низкие пороги)
- Дополнительные услуги
- Парковки поблизости (количество)
- Иная аудиенция оценок (другой пул)

**Извлечение**:
```js
const text = document.body.innerText;
const features = text.match(/Доступная среда[\s\S]*?(?=\n[А-Я]|$)/)?.[0];
const transport = text.match(/Транспорт[\s\S]*?(?=\n[А-Я]|$)/)?.[0];
```

---

## 5. Prodoctorov

URL: `https://prodoctorov.ru/<city>/lpu/<ID>-<slug>/`

**Что вытащить:**
- Список врачей с ФИО + специализация + СТАЖ (часто только Prodoctorov даёт стаж в годах)
- Образовательное учреждение каждого
- Квадратные фото врачей (низкое разрешение 100×100 — backup если на старом сайте фото нет)
- Кол-во отзывов на каждого

**Photos URL pattern:**
```
https://prodoctorov.ru/media/photo/<city>/doctorimage/<doctor_id>/<file_id>-<doctor_id>-<surname>_square_small.jpg
```

Скачать все фото:
```python
urls = [
  ('balabanova', 'https://prodoctorov.ru/media/...'),
  ...
]
for name, url in urls:
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20) as r:
        open(f'research/doctors-prodoctorov/{name}.jpg', 'wb').write(r.read())
```

---

## 6. Backup источники (опционально)

- **Zoon** — отзывы которые есть только там
- **DocDoc** — рейтинг по специальностям
- **Instagram** — если ведут активно — недавние акции, реальные фото пациентов с разрешения

Эти открывай если данных с ЯК+старого сайта+Prodoctorov мало.

---

## 7. Консолидация — `research/clinic_data.json`

Финальный шаг: собрать всё в один структурированный файл:

```json
{
  "clinic": {
    "name": "...",
    "legal_name": "ООО «...»",
    "inn": "...",
    "license": "...",
    "address": "...",
    "district": "...",
    "phones": { "yandex_current": "...", "old_site": "..." },
    "email": "...",
    "site": "...",
    "yclients_booking": "...",
    "instagram": "...",
    "transit": { "metro": [...], "bus": "..." },
    "hours_partial": "...",
    "ratings": {
      "yandex": { "score": 5.0, "votes": 281, "reviews": 227, "award": "..." },
      "2gis": { "score": 4.8, "votes": 42 },
      "prodoctorov": { "reviews_count": 3 }
    },
    "features": [...],
    "payment_methods": [...],
    "rating_breakdown_yandex": { "Качество лечения": "99% (156)", ... }
  },
  "doctors": [
    { "slug": "...", "name": "...", "role": "...", "edu": "...", "experience": "...", "extra": "..." }
  ],
  "services_categories": { "terapiya": "Терапия (~38 позиций)", ... },
  "services_yandex_list": ["имплантология", "ортодонтия", ...],
  "implant_systems": ["Nobel", "Straumann", ...],
  "showcase_yandex": [...],
  "promo": ["Семейная скидка 15%", ...],
  "sources": { "yandex_maps_org": "...", "site": "...", ... }
}
```

---

## 8. Чек-лист готовности к билду

Перед началом разработки сайта проверь что есть:

```
[ ] research/clinic_data.json — заполнен полностью
[ ] research/reviews_yandex.json — минимум 50 уникальных отзывов
[ ] research/photos_yandex.json — список 30+ фото URL
[ ] research/images-yandex/*.jpg — скачаны
[ ] research/images-old-site/clinic_*.jpg — фото интерьера (если есть)
[ ] research/images-old-site/doctor_*.jpg — фото врачей (если есть)
[ ] research/doctors-prodoctorov/*.jpg — квадратные фото врачей (backup)
[ ] research/prices/all_prices.json — прайс-листы распарсены
[ ] research/prices/*.xlsx — оригиналы
```

Если чего-то нет — либо клиника новая, либо доступа нет. Заполняем placeholder'ами + кладём в open questions для клиента.

---

## 9. Типичные пробелы и workarounds

| Пробел | Workaround |
|---|---|
| Нет фото врачей | Использовать инициалы fallback (`bg-accent-soft` + ФИ инициалы серифом) |
| Фото врачей с разных фонов (студия + интерьер + смартфон) | Не пытаться унифицировать программно — оставить как есть, при покупке клиника даст hi-res на одном фоне |
| Нет прайса в открытом виде | Маркировать «Цены уточняются на консультации»; отдельный CTA-блок «Узнать стоимость» |
| Часы работы неполные на ЯК | Использовать placeholder Пн-Сб 09:00-19:00; добавить в open questions |
| Два разных телефона на сайте и ЯК | Я.Карт = primary (актуальный), старый сайт = secondary. Можно показать оба |
| Нет специфичных услуг детально | Использовать generic описания на страницах /uslugi/<slug>/ |
| Реальные before/after — нет | Не выдумывать. Скрывать секцию или ставить placeholder + пометить TODO |

---

## 10. Время на скрап одной клиники

При работе AI-агента через Playwright:
- Discovery (Google + 5 источников): ~5 минут
- Я.Карт scraping (org page + reviews + 50 фото): ~10 минут (большая часть — скролл reviews)
- Старый сайт + xlsx parse: ~5 минут
- 2GIS + Prodoctorov: ~3 минуты
- Скачивание изображений: ~5 минут
- Консолидация JSON: ~2 минуты

**Итого**: ~30 минут, ~80-100K токенов (если Sonnet делает скрап).

---

## 11. Применимость к другим типам клиник

Структура работает для любого профиля:
- Стоматология (тестировано — АПЕКС)
- Косметология (поменять services list)
- Педиатрия (добавить акцент на безопасность для детей)
- Гинекология (более «приватный» tone of voice)
- Многопрофильные клиники (расширить services до 10-12 направлений)

Все источники (ЯК, 2GIS, Prodoctorov) индексируют любые мед-клиники. Юр.требования те же (152-ФЗ, лицензия Минздрава, противопоказания disclaimer).

---

## 12. Чего НЕ делать

- ❌ **Не выдумывать данные** которых нет в источниках (counts пациентов, проценты успеха процедур, гарантийные сроки). Помечать TBD.
- ❌ **Не использовать стоковые фото врачей** — клиент увидит и не купит. Либо реальные с источников, либо инициалы fallback.
- ❌ **Не копировать тексты со старого сайта дословно** — копирайт + плохой стиль. Переписывать тон.
- ❌ **Не игнорировать 152-ФЗ disclaimer** — без него Роскомнадзор штрафует.
- ❌ **Не верить рейтингу с одного источника** — всегда сравнивать с 2GIS / Prodoctorov / Zoon (могут быть кардинально разные оценки на разных площадках).
