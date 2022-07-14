import { Component, Input, OnInit } from '@angular/core';
import { CardStatus, CardStatusInfos } from '../../model/card';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent {
  @Input() status: CardStatus = CardStatus.PENDING;
  CardStatusInfos = CardStatusInfos;
}
