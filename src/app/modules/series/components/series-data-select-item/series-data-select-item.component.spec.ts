import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDataSelectItemComponent } from './series-data-select-item.component';

describe('SeriesDataSelectItemComponent', () => {
  let component: SeriesDataSelectItemComponent;
  let fixture: ComponentFixture<SeriesDataSelectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesDataSelectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDataSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
