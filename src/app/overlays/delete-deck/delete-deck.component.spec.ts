import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeckComponent } from './delete-deck.component';

describe('DeleteDeckComponent', () => {
  let component: DeleteDeckComponent;
  let fixture: ComponentFixture<DeleteDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
