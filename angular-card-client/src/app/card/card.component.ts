import { Component, Input, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { Card, CardStatus, CardStatusInfos, Transitions } from '../model/card';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() set card(card: Card) {
    this._card = card;
    if (card) {
      this.currentStatus = card.status;
      this.createdDistance = this.buildCreatedDistance(card.created_date);
      this.nextStatus = this.buildNextStatus(card?.status);
    }
  }

  get card() {
    return this._card;
  }

  currentStatus = CardStatus.PENDING;
  nextStatus: { id: CardStatus }[] = [];

  CardStatusInfos = CardStatusInfos;
  createdDistance = '';
  private _card: Card;

  constructor(private readonly cardService: CardsService) {}

  ngOnInit(): void {}

  buildCreatedDistance(creationDate: string): string {
    return formatDistance(new Date(creationDate), new Date(), {
      addSuffix: true,
    });
  }

  buildNextStatus(status: CardStatus): { id: CardStatus }[] {
    return Transitions[status].map((s) => {
      return {
        id: s,
      };
    });
  }

  onStatusChange(): void {
    this.cardService.setStatus(this.card.id, this.currentStatus);
  }
}
