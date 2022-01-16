import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticLiquidationComponent } from './statistic-liquidation.component';

describe('StatisticLiquidationComponent', () => {
  let component: StatisticLiquidationComponent;
  let fixture: ComponentFixture<StatisticLiquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticLiquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
