import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAndPawnRegistrationComponent } from './homepage-and-pawn-registration.component';

describe('HomepageAndPawnRegistrationComponent', () => {
  let component: HomepageAndPawnRegistrationComponent;
  let fixture: ComponentFixture<HomepageAndPawnRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageAndPawnRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAndPawnRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
