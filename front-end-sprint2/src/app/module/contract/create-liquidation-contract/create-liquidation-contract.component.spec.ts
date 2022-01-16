import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLiquidationContractComponent } from './create-liquidation-contract.component';

describe('CreateLiquidationContractComponent', () => {
  let component: CreateLiquidationContractComponent;
  let fixture: ComponentFixture<CreateLiquidationContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLiquidationContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiquidationContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
