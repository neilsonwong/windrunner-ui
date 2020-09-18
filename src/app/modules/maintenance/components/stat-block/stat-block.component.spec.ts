import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBlockComponent } from './stat-block.component';

describe('StatBlockComponent', () => {
  let component: StatBlockComponent;
  let fixture: ComponentFixture<StatBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
