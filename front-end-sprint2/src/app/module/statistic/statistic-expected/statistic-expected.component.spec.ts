import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticExpectedComponent } from './statistic-expected.component';

describe('StatisticExpectedComponent', () => {
  let component: StatisticExpectedComponent;
  let fixture: ComponentFixture<StatisticExpectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticExpectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticExpectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
