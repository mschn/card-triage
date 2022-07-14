import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  filterInput = '';

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {}

  filterChanged(): void {
    this.dataService.setFilter(this.filterInput);
  }
}
