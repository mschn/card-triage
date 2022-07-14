export interface Card {
  id: number;
  patient_name: string;
  status: CardStatus;
  created_date: string;
  arrhythmias: Arrhythmia[];
}

export enum CardStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  DONE = 'DONE',
}

export enum Arrhythmia {
  AFIB = 'AFib',
  AVBLOCK = 'AV Block',
  PAUSE = 'Pause',
  PSVC = 'PSVC',
  PVC = 'PVC',
}


export interface CardStatusInfo {
  color: string;
  icon: string;
  name: string;
}

export const CardStatusInfos: Record<CardStatus, CardStatusInfo> = {
  DONE: { color: 'bg-success', icon: 'bi-check-square', name: 'Done' },
  PENDING: { color: 'bg-primary', icon: 'bi-clock', name: 'Pending' },
  REJECTED: { color: 'bg-danger', icon: 'bi-x-square', name: 'Rejected' },
};

export const Transitions: Record<CardStatus, CardStatus[]> = {
  PENDING: [CardStatus.DONE],
  REJECTED: [CardStatus.DONE],
  DONE: [CardStatus.REJECTED],
};
