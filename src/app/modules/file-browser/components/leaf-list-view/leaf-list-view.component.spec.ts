import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafListViewComponent } from './leaf-list-view.component';

describe('LeafListViewComponent', () => {
  let component: LeafListViewComponent;
  let fixture: ComponentFixture<LeafListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
