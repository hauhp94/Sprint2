import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationEmployeeComponent } from './edit-information-employee.component';

describe('EditInformationEmployeeComponent', () => {
  let component: EditInformationEmployeeComponent;
  let fixture: ComponentFixture<EditInformationEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInformationEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformationEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
