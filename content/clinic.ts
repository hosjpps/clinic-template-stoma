export interface ClinicInfo {
  name: string;
  legalName: string;
  inn: string;
  license: string;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    lat: number;
    lng: number;
  };
  phones: { label: string; value: string; display: string }[];
  email: string;
  website: string;
  yclientsUrl: string;
  social: {
    instagram?: string;
    yandexMapsId?: string;
  };
  rating: {
    value: number;
    votes: number;
    reviews: number;
    award?: string;
  };
  metro: { name: string; walkMin: number; walkMeters?: number; line?: string }[];
  bus: { lines: string[]; stop: string };
  founded: number;
  hours: { day: string; open: string; close: string }[];
  features: string[];
  promos: string[];
}

export const clinic: ClinicInfo = {
  name: 'НАЗВАНИЕ',                            // TODO: replace
  legalName: 'ООО «...»',                       // TODO
  inn: '0000000000',                            // TODO
  license: 'ЛО-XX-XX-XXXXXX от DD.MM.YYYY',    // TODO
  address: {
    street: 'ул. ...',
    city: 'Москва',
    district: '...',
    postalCode: '000000',
    lat: 0,
    lng: 0,
  },
  phones: [
    { label: 'Основной', value: '+70000000000', display: '+7 (___) ___-__-__' },
  ],
  email: 'info@example.com',
  website: 'https://example.com',
  yclientsUrl: '',
  social: { instagram: '', yandexMapsId: '' },
  rating: { value: 5.0, votes: 0, reviews: 0, award: '' },
  metro: [],
  bus: { lines: [], stop: '' },
  founded: 2020,
  hours: [
    { day: 'Пн–Сб', open: '09:00', close: '20:00' },
    { day: 'Вс', open: '', close: '' },
  ],
  features: [],
  promos: [],
};
