import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingTextComponent } from './rotating-text.component';

describe('RotatingTextComponent', () => {
  let component: RotatingTextComponent;
  let fixture: ComponentFixture<RotatingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotatingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotatingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
