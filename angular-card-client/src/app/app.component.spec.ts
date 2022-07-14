import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { MOCK_6_CARDS } from './model/mocks';
import { CardsService } from './services/cards.service';
import { DataService } from './services/data.service';
import { throwError } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let http: HttpClient;

  let dataService: DataService;
  let cardsService: CardsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, CardListComponent, CardComponent],
      imports: [HttpClientModule],
      providers: [CardsService, DataService],
    }).compileComponents();
    http = TestBed.inject(HttpClient);
    dataService = TestBed.inject(DataService);
    cardsService = TestBed.inject(CardsService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should display 6 cards in 2 columns', () => {
    spyOn(cardsService, 'fetchCards').and.callFake(() => {
      dataService.setCards(MOCK_6_CARDS);
    });
    fixture.detectChanges();

    expect(cardsService.fetchCards).toHaveBeenCalled();
    const cardLists = fixture.nativeElement.querySelectorAll('app-card-list');
    expect(cardLists.length).toBe(2);

    const pendingCards = cardLists[0].querySelectorAll('app-card');
    expect(pendingCards.length).toBe(5);
    expect(pendingCards[0].querySelector('h5').innerText).toEqual('Bob');
    expect(pendingCards[1].querySelector('h5').innerText).toEqual('Bill');
    expect(pendingCards[2].querySelector('h5').innerText).toEqual('Flora');
    expect(pendingCards[3].querySelector('h5').innerText).toEqual('Marc');
    expect(pendingCards[4].querySelector('h5').innerText).toEqual('John');

    const doneCards = cardLists[1].querySelectorAll('app-card');
    expect(doneCards[0].querySelector('h5').innerText).toEqual('Elsa');
    expect(doneCards.length).toBe(1);
  });

  it('Should display an http error', () => {
    spyOn(http, 'get').and.returnValue(
      throwError(() => new Error('fetch status failure'))
    );
    fixture.detectChanges();

    const cardLists = fixture.nativeElement.querySelectorAll('app-card-list');
    expect(cardLists.length).toBe(2);

    const pendingCards = cardLists[0].querySelectorAll('app-card');
    expect(pendingCards.length).toBe(0);
    const doneCards = cardLists[1].querySelectorAll('app-card');
    expect(doneCards.length).toBe(0);

    expect(fixture.nativeElement.querySelector('.alert').innerText).toContain(
      'fetch status failure'
    );
  });
});
