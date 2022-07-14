import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardStatus } from './model/card';
import { CardsService } from './services/cards.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  CardStatus = CardStatus;

  constructor(
    private readonly cardsService: CardsService,
    readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.cardsService.fetchCards();
  }
}
