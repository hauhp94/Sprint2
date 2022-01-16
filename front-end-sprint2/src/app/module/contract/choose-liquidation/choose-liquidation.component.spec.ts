import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLiquidationComponent } from './choose-liquidation.component';

describe('ChooseLiquidationComponent', () => {
  let component: ChooseLiquidationComponent;
  let fixture: ComponentFixture<ChooseLiquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseLiquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
