import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticInterestComponent } from './statistic-interest.component';

describe('StatisticInterestComponent', () => {
  let component: StatisticInterestComponent;
  let fixture: ComponentFixture<StatisticInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
