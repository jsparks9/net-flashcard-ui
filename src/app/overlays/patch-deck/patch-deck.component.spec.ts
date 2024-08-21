import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchDeckComponent } from './patch-deck.component';

describe('PatchDeckComponent', () => {
  let component: PatchDeckComponent;
  let fixture: ComponentFixture<PatchDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchDeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
