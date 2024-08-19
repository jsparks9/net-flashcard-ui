import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckBoxComponent } from './deck-box.component';

describe('DeckBoxComponent', () => {
  let component: DeckBoxComponent;
  let fixture: ComponentFixture<DeckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
