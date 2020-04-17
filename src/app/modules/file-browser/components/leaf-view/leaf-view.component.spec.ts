import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafViewComponent } from './leaf-view.component';

describe('LeafViewComponent', () => {
  let component: LeafViewComponent;
  let fixture: ComponentFixture<LeafViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
