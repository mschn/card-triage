import { Arrhythmia, CardStatus, Card } from './card';

export const MOCK_2_CARDS: Card[] = [
  {
    arrhythmias: [Arrhythmia.AFIB, Arrhythmia.AVBLOCK, Arrhythmia.PAUSE],
    created_date: '2019-12-31T00:11:14+0000',
    id: 2,
    patient_name: 'Elsa',
    status: CardStatus.DONE,
  },
  {
    arrhythmias: [Arrhythmia.AFIB, Arrhythmia.PSVC],
    created_date: '2019-01-23T00:18:34+0000',
    id: 3,
    patient_name: 'Flora',
    status: CardStatus.REJECTED,
  },
];

export const MOCK_6_CARDS: Card[] = [
  {
    arrhythmias: ['AFib', 'AV Block', 'Pause', 'PSVC', 'PVC'],
    created_date: '2020-03-10T13:14:59+0000',
    id: 0,
    patient_name: 'Bob',
    status: CardStatus.PENDING,
  },
  {
    arrhythmias: ['Pause'],
    created_date: '2020-01-01T00:12:21+0000',
    id: 1,
    patient_name: 'Bill',
    status: CardStatus.REJECTED,
  },
  {
    arrhythmias: ['AFib', 'Pause'],
    created_date: '2019-12-31T00:11:14+0000',
    id: 2,
    patient_name: 'Elsa',
    status: CardStatus.DONE,
  },
  {
    arrhythmias: ['PVC', 'PSVC', 'AFib'],
    created_date: '2019-01-23T00:18:34+0000',
    id: 3,
    patient_name: 'Flora',
    status: CardStatus.REJECTED,
  },
  {
    arrhythmias: ['AV Block', 'PVC'],
    created_date: '2019-02-21T00:08:58+0000',
    id: 4,
    patient_name: 'Marc',
    status: CardStatus.PENDING,
  },
  {
    arrhythmias: ['Pause', 'PVC', 'PSVC'],
    created_date: '2019-02-21T00:09:32+0000',
    id: 5,
    patient_name: 'John',
    status: CardStatus.PENDING,
  },
] as Card[];
