import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafLineViewComponent } from './leaf-line-view.component';

describe('LeafLineViewComponent', () => {
  let component: LeafLineViewComponent;
  let fixture: ComponentFixture<LeafLineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafLineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafLineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
