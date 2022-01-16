import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerListDeleteComponent } from './computer-list-delete.component';

describe('ComputerListDeleteComponent', () => {
  let component: ComputerListDeleteComponent;
  let fixture: ComponentFixture<ComputerListDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerListDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerListDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
