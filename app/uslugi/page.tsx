import type { Metadata } from 'next';
import { priceCategories } from '@/content/prices';
import BookingDialog from '@/components/forms/BookingDialog';

export const metadata: Metadata = {
  title: 'Цены на услуги',
  description:
    'Актуальный прайс-лист стоматологии. Полный перечень услуг: терапия, имплантация, ортодонтия, хирургия, ортопедия.',
};

export default function UslugiPage() {
  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl text-primary mb-2">
        Цены на стоматологические услуги
      </h1>
      <p className="text-text-muted mb-8">
        Полный прайс-лист по категориям. Цены действительны на момент публикации.
      </p>

      {priceCategories.map((category, index) => (
        <details
          key={category.id}
          id={category.id}
          open={index === 0}
          className="border border-border rounded-[12px] mb-4 bg-white"
        >
          <summary className="cursor-pointer p-4 font-semibold text-primary flex justify-between items-center list-none">
            <span>{category.name}</span>
            <span className="text-text-muted text-sm font-normal">
              {category.items.length} позиций
            </span>
          </summary>
          <div className="border-t border-border">
            <table className="w-full">
              <tbody>
                {category.items.map((item, rowIdx) => (
                  <tr
                    key={item.id}
                    className={rowIdx % 2 === 0 ? 'bg-bg-soft' : 'bg-white'}
                  >
                    <td className="px-4 py-2 text-sm">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-right whitespace-nowrap font-medium">
                      {item.price !== null
                        ? `${item.price.toLocaleString('ru-RU')} ₽${item.unit ? ' ' + item.unit : ''}`
                        : 'уточняйте'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}

      <p className="text-xs text-text-muted mt-8 border-t border-border pt-4">
        Цены действительны на момент публикации и могут быть изменены. Окончательная
        стоимость уточняется на консультации.
      </p>

      <div className="bg-bg-soft p-8 rounded-[16px] mt-12 text-center">
        <h3 className="font-serif text-2xl text-primary mb-2">
          Запишитесь на консультацию
        </h3>
        <p className="text-text-muted mb-6">
          Подберём оптимальный план лечения
        </p>
        <BookingDialog triggerLabel="Записаться" />
      </div>
    </main>
  );
}
