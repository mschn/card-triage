import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CardsService } from '../services/cards.service';
import { DataService } from '../services/data.service';
import { CardComponent } from './card.component';
import { Arrhythmia, Card, CardStatus } from '../model/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [HttpClientModule],
      providers: [CardsService, DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not display a card if input is missing', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.card')).toBeFalsy();
  });

  it('should display a card with the correct info', () => {
    component.card = {
      arrhythmias: [Arrhythmia.AFIB, Arrhythmia.AVBLOCK, Arrhythmia.PAUSE],
      created_date: '2020-03-10T13:14:59+0000',
      id: 0,
      patient_name: 'Bob',
      status: CardStatus.REJECTED,
    };
    fixture.detectChanges();

    // TODO this assertion will fail next year, need to mock current date
    expect(component.createdDistance).toEqual('over 2 years ago');
    expect(component.nextStatus).toEqual([{ id: CardStatus.DONE }]);
    expect(component.currentStatus).toEqual(CardStatus.REJECTED);
    expect(fixture.nativeElement.querySelector('h5').innerText).toEqual('Bob');
  });

  it('Should build the correct transition options in status select', () => {
    expect(component.buildNextStatus(CardStatus.PENDING)).toEqual([
      { id: CardStatus.DONE },
    ]);
    expect(component.buildNextStatus(CardStatus.DONE)).toEqual([
      { id: CardStatus.REJECTED },
    ]);
    expect(component.buildNextStatus(CardStatus.REJECTED)).toEqual([
      { id: CardStatus.DONE },
    ]);
  });
});
