import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardStatus } from '../model/card';

import { CardListComponent } from './card-list.component';
import { CardComponent } from '../card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsService } from '../services/cards.service';
import { DataService } from '../services/data.service';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListComponent, CardComponent],
      imports: [HttpClientModule],
      providers: [CardsService, DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a message if list is empty', () => {
    expect(fixture.nativeElement.querySelector('div').innerText).toEqual(
      'This list is empty'
    );
    expect(fixture.nativeElement.querySelector('app-card')).toBeFalsy();
  });

  it('Should display 2 cards', () => {
    component.cards = [
      {
        arrhythmias: [],
        created_date: '2019-12-31T00:11:14+0000',
        id: 2,
        patient_name: 'Elsa',
        status: CardStatus.DONE,
      },
      {
        arrhythmias: [],
        created_date: '2019-01-23T00:18:34+0000',
        id: 3,
        patient_name: 'Flora',
        status: CardStatus.REJECTED,
      },
    ];
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toEqual(2);
    expect(cards[0].querySelector('h5').innerText).toEqual('Elsa');
    expect(cards[1].querySelector('h5').innerText).toEqual('Flora');
  });
});
