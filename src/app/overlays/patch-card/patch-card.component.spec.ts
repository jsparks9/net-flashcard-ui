import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchCardComponent } from './patch-card.component';

describe('PatchCardComponent', () => {
  let component: PatchCardComponent;
  let fixture: ComponentFixture<PatchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
