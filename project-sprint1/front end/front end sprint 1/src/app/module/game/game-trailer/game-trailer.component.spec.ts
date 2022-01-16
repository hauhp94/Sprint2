import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTrailerComponent } from './game-trailer.component';

describe('GameTrailerComponent', () => {
  let component: GameTrailerComponent;
  let fixture: ComponentFixture<GameTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
