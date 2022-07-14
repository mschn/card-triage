import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, CardStatus } from '../model/card';
import { GET_CARDS, POST_STATUS, SERVER_BASE } from '../model/endpoints';
import { DataService } from './data.service';

@Injectable()
export class CardsService {
  constructor(
    private readonly http: HttpClient,
    private readonly dataService: DataService
  ) {}

  public fetchCards(): void {
    this.http.get<Card[]>(`${SERVER_BASE}${GET_CARDS}`).subscribe({
      next: (cards) => this.dataService.setCards(cards),
      error: (error) =>
        this.dataService.setError({
          error: 'Failed to fetch cards',
          cause: error?.message,
        }),
    });
  }

  public setStatus(id: number, status: CardStatus): void {
    this.http
      .post<Card[]>(`${SERVER_BASE}${POST_STATUS}`, { id, status })
      .subscribe({
        next: (cards) => this.dataService.setCards(cards),
        error: (error) =>
          this.dataService.setError({
            error: 'Failed to update card status',
            cause: error?.message,
          }),
      });
  }
}
