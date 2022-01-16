import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStoreComponent } from './history-store.component';

describe('HistoryStoreComponent', () => {
  let component: HistoryStoreComponent;
  let fixture: ComponentFixture<HistoryStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
