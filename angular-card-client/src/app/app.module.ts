import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { CardsService } from './services/cards.service';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatusComponent } from './card/status/status.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, CardComponent, CardListComponent, StatusComponent, StatusComponent, NavbarComponent],
  imports: [BrowserModule, HttpClientModule, NgSelectModule, FormsModule],
  providers: [CardsService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
