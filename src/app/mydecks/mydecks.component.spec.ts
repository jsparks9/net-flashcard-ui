import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydecksComponent } from './mydecks.component';

describe('MydecksComponent', () => {
  let component: MydecksComponent;
  let fixture: ComponentFixture<MydecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MydecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
