import { CardsService } from './cards.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { of, throwError } from 'rxjs';
import { MOCK_2_CARDS } from '../model/mocks';
import { CardStatus } from '../model/card';
describe('CardsService', () => {
  let cardsService: CardsService;
  let dataService: DataService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    dataService = new DataService();
    spyOn(dataService, 'setError');
    spyOn(dataService, 'setCards');
    http = TestBed.inject(HttpClient);
    cardsService = new CardsService(http, dataService);
  });

  it('should fetch cards successfully', () => {
    spyOn(http, 'get').and.returnValue(of(MOCK_2_CARDS));
    cardsService.fetchCards();
    expect(dataService.setCards).toHaveBeenCalledOnceWith(MOCK_2_CARDS);
    expect(dataService.setError).not.toHaveBeenCalled();
  });

  it('should fetch cards with error', () => {
    spyOn(http, 'get').and.returnValue(
      throwError(() => new Error('cards failed'))
    );
    cardsService.fetchCards();
    expect(dataService.setCards).not.toHaveBeenCalled();
    expect(dataService.setError).toHaveBeenCalledOnceWith({
      error: 'Failed to fetch cards',
      cause: 'cards failed',
    });
  });

  it('should set status successfully', () => {
    spyOn(http, 'post').and.returnValue(of(MOCK_2_CARDS));
    cardsService.setStatus(0, CardStatus.DONE);
    expect(dataService.setCards).toHaveBeenCalledOnceWith(MOCK_2_CARDS);
    expect(dataService.setError).not.toHaveBeenCalled();
  });

  it('should set card status with error', () => {
    spyOn(http, 'post').and.returnValue(
      throwError(() => new Error('status failed'))
    );
    cardsService.setStatus(0, CardStatus.DONE);
    expect(dataService.setCards).not.toHaveBeenCalled();
    expect(dataService.setError).toHaveBeenCalledOnceWith({
      error: 'Failed to update card status',
      cause: 'status failed',
    });
  });
});
