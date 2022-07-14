import { DataService } from './data.service';
import { Arrhythmia, CardStatus } from '../model/card';
describe('DataService', () => {
  let dataService: DataService;

  beforeEach(async () => {
    dataService = new DataService();
    dataService.setCards([
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
    ]);
  });

  it('should filter cards by name', (done) => {
    dataService.setFilter('LSa');
    dataService
      .getCardsByStatus(CardStatus.REJECTED, CardStatus.DONE)
      .subscribe((cards) => {
        expect(cards.length).toBe(1);
        expect(cards[0].patient_name).toEqual('Elsa');
        done();
      });
  });

  it('should filter cards by arrhythmia', (done) => {
    dataService.setFilter('sv');
    dataService
      .getCardsByStatus(CardStatus.REJECTED, CardStatus.DONE)
      .subscribe((cards) => {
        expect(cards.length).toBe(1);
        expect(cards[0].patient_name).toEqual('Flora');
        done();
      });
  });

  it('should get REJECTED cards only', (done) => {
    dataService.getCardsByStatus(CardStatus.REJECTED).subscribe((cards) => {
      expect(cards.length).toBe(1);
      expect(cards[0].patient_name).toEqual('Flora');
      done();
    });
  });
});
