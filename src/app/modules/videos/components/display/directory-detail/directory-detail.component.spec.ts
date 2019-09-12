import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryDetailComponent } from './directory-detail.component';

describe('DirectoryDetailComponent', () => {
  let component: DirectoryDetailComponent;
  let fixture: ComponentFixture<DirectoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
