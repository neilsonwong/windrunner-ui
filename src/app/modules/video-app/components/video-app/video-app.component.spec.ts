import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAppComponent } from './video-app.component';

describe('VideoAppComponent', () => {
  let component: VideoAppComponent;
  let fixture: ComponentFixture<VideoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
