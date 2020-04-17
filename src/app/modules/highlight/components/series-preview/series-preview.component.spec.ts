import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPreviewComponent } from './series-preview.component';

describe('SeriesPreviewComponent', () => {
  let component: SeriesPreviewComponent;
  let fixture: ComponentFixture<SeriesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
