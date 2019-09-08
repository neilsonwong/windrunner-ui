import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxHeaderComponent } from './box-header.component';

describe('BoxHeaderComponent', () => {
  let component: BoxHeaderComponent;
  let fixture: ComponentFixture<BoxHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
