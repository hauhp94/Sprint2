import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDeleteDialogComponent } from './game-delete-dialog.component';

describe('GameDeleteDialogComponent', () => {
  let component: GameDeleteDialogComponent;
  let fixture: ComponentFixture<GameDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
