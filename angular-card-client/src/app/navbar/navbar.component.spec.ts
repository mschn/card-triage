import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { DataService } from '../services/data.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    spyOn(dataService, 'setFilter');
    fixture.detectChanges();
  });

  it('should set filter value in data service', () => {
    component.filterInput = 'filtered';
    fixture.nativeElement
      .querySelector('input')
      .dispatchEvent(new KeyboardEvent('input'));
    fixture.detectChanges();
    expect(dataService.setFilter).toHaveBeenCalledWith('filtered');
  });
});
