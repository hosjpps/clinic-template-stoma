'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { services } from '@/content/services';

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Слишком длинное')
    .regex(/^[а-яёА-ЯЁa-zA-Z\s\-]+$/, 'Только буквы и дефис'),
  phone: z
    .string()
    .regex(
      /^(\+7|8)[\s\-(]?9\d{2}[\s\-)]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
      'Введите российский мобильный номер'
    ),
  service: z.string().optional(),
  preferredTime: z.enum(['morning', 'day', 'evening']).optional(),
  consent: z.literal(true, {
    message: 'Необходимо согласие на обработку данных',
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSuccess?: () => void;
}

const TIME_OPTIONS = [
  { value: 'morning', label: 'Утро', sub: 'до 12:00' },
  { value: 'day', label: 'День', sub: '12–15:00' },
  { value: 'evening', label: 'Вечер', sub: 'после 15' },
] as const;

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: standardSchemaResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      service: '',
      consent: undefined as unknown as true,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const consentValue = watch('consent');
  const preferredTime = watch('preferredTime');

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    console.log('[BookingForm] Данные:', data);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success('Заявка отправлена', {
      description: 'Перезвоним в течение 5 минут.',
    });
    form.reset();
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      aria-label="Форма записи в клинику"
      noValidate
    >
      {/* Имя */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="booking-name">
          Ваше имя <span aria-hidden="true" className="text-red-500">*</span>
        </Label>
        <Input
          id="booking-name"
          type="text"
          placeholder="Ваше имя"
          autoComplete="given-name"
          aria-required="true"
          aria-describedby={errors.name ? 'booking-name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="booking-name-error" role="alert" className="text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Телефон */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="booking-phone">
          Телефон <span aria-hidden="true" className="text-red-500">*</span>
        </Label>
        <Input
          id="booking-phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          aria-required="true"
          aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
          {...register('phone')}
        />
        {errors.phone && (
          <p id="booking-phone-error" role="alert" className="text-xs text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Услуга */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="booking-service">Услуга</Label>
        <Select onValueChange={(v) => setValue('service', v as string)}>
          <SelectTrigger id="booking-service" className="w-full" aria-label="Выберите услугу">
            <SelectValue placeholder="Не выбрано" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Удобное время */}
      <div className="flex flex-col gap-2">
        <Label>Удобное время</Label>
        <RadioGroup
          className="flex gap-3"
          onValueChange={(v) =>
            setValue('preferredTime', v as 'morning' | 'day' | 'evening')
          }
        >
          {TIME_OPTIONS.map((t) => (
            <div key={t.value} className="flex items-center">
              <RadioGroupItem
                value={t.value}
                id={`time-${t.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`time-${t.value}`}
                className={[
                  'cursor-pointer border rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  preferredTime === t.value
                    ? 'bg-accent/10 border-accent text-primary'
                    : 'border-border text-primary/80 hover:border-accent/60',
                ].join(' ')}
              >
                {t.label}
                <span className="block text-xs font-normal text-muted-foreground">
                  {t.sub}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Согласие */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="booking-consent"
          checked={consentValue === true}
          onCheckedChange={(checked) =>
            setValue(
              'consent',
              checked === true ? true : (undefined as unknown as true)
            )
          }
          aria-required="true"
          aria-describedby={errors.consent ? 'booking-consent-error' : undefined}
        />
        <div>
          <Label
            htmlFor="booking-consent"
            className="text-sm font-normal text-muted-foreground cursor-pointer leading-relaxed"
          >
            Согласен с обработкой{' '}
            <a href="/soglasie-na-obrabotku-pd/" className="underline hover:text-primary">
              персональных данных
            </a>{' '}
            и{' '}
            <a href="/politika-konfidencialnosti/" className="underline hover:text-primary">
              политикой конфиденциальности
            </a>
          </Label>
          {errors.consent && (
            <p id="booking-consent-error" role="alert" className="text-xs text-red-500 mt-0.5">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading || !consentValue}
        aria-busy={loading}
      >
        {loading ? 'Отправляем...' : 'Записаться'}
      </Button>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Нажимая «Записаться», вы соглашаетесь с{' '}
        <a href="/politika-konfidencialnosti/" className="underline hover:text-primary">
          политикой конфиденциальности
        </a>{' '}
        и{' '}
        <a href="/soglasie-na-obrabotku-pd/" className="underline hover:text-primary">
          согласием на обработку ПД
        </a>
        . Имеются противопоказания. Проконсультируйтесь со специалистом.
      </p>

      <noscript>
        <p className="text-sm text-muted-foreground">
          Для записи обратитесь по телефону, указанному на сайте.
        </p>
      </noscript>
    </form>
  );
}
