import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCustomerComponent } from './choose-customer.component';

describe('ChooseCustomerComponent', () => {
  let component: ChooseCustomerComponent;
  let fixture: ComponentFixture<ChooseCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
