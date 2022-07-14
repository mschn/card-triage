import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Card, CardStatus } from '../model/card';
import { CardError } from '../model/endpoints';

@Injectable()
export class DataService {
  private cards = new BehaviorSubject<Card[]>([]);
  private filter = new BehaviorSubject<string>('');
  private error = new BehaviorSubject<CardError | null>(null);

  public getCardsByStatus(...status: CardStatus[]): Observable<Card[]> {
    return this.cards.asObservable().pipe(
      map((cards) =>
        cards.filter((card) => {
          return status.includes(card.status) && this.matchFilter(card);
        })
      )
    );
  }

  public setCards(cards: Card[]): void {
    this.cards.next(cards);
  }

  public setFilter(filter: string): void {
    this.filter.next(filter);
  }

  public getFilter(): Observable<string> {
    return this.filter.asObservable();
  }

  public setError(error: CardError): void {
    this.error.next(error);
  }

  public getError(): Observable<CardError | null> {
    return this.error.asObservable();
  }

  matchFilter(card: Card): boolean {
    const fv = this.filter.getValue()?.toLowerCase();
    if (!fv || fv.trim().length === 0) {
      return true;
    }

    return (
      card.patient_name.toLocaleLowerCase().includes(fv) ||
      card.arrhythmias.some((arr) => arr.toLocaleLowerCase().includes(fv))
    );
  }
}
