import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangPassWordComponent } from './chang-pass-word.component';

describe('ChangPassWordComponent', () => {
  let component: ChangPassWordComponent;
  let fixture: ComponentFixture<ChangPassWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangPassWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangPassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
