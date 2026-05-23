export interface Doctor {
  id: string;
  name: string;
  position: string;
  specialization: string;
  education: string;
  experience: string;
  courses?: string[];
  photo: string;
  initials: string;
}

export const doctors: Doctor[] = [
  {
    id: 'sample-doctor',
    name: 'Иванов Иван Иванович',
    position: 'Главный врач',
    specialization: 'Стоматолог-терапевт',
    education: 'Название ВУЗа',
    experience: '15+ лет',
    photo: '/images/doctors/sample-doctor.jpg',
    initials: 'ИИ',
  },
  // TODO: add more doctors
];
