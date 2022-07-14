import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardStatus } from 'src/app/model/card';

import { StatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a PENDING status', () => {
    expect(
      fixture.nativeElement.querySelector('.badge.bg-primary')
    ).toBeDefined();
    expect(
      fixture.nativeElement.querySelector('.badge.bi-clock')
    ).toBeDefined();
    expect(
      fixture.nativeElement.querySelector('.badge.bg-primary').innerText
    ).toContain('Pending');
  });

  it('should display a DONE status', () => {
    component.status = CardStatus.DONE;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.badge.bg-success')
    ).toBeDefined();
    expect(
      fixture.nativeElement.querySelector('.badge.bi-check-squre')
    ).toBeDefined();
    expect(
      fixture.nativeElement.querySelector('.badge.bg-success').innerText
    ).toContain('Done');
  });
});
