import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServicesComponent } from './delete-services.component';

describe('DeleteServicesComponent', () => {
  let component: DeleteServicesComponent;
  let fixture: ComponentFixture<DeleteServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
