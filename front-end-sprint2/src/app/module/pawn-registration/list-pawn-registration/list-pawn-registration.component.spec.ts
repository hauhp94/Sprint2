import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPawnRegistrationComponent } from './list-pawn-registration.component';

describe('ListPawnRegistrationComponent', () => {
  let component: ListPawnRegistrationComponent;
  let fixture: ComponentFixture<ListPawnRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPawnRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPawnRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
