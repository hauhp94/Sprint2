import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHomepageComponent } from './guest-homepage.component';

describe('GuestHomepageComponent', () => {
  let component: GuestHomepageComponent;
  let fixture: ComponentFixture<GuestHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
