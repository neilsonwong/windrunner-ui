import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDataSelectComponent } from './series-data-select.component';

describe('SeriesDataSelectComponent', () => {
  let component: SeriesDataSelectComponent;
  let fixture: ComponentFixture<SeriesDataSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesDataSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDataSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
