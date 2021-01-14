import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbbuxComponent } from './rbbux.component';

describe('RbbuxComponent', () => {
  let component: RbbuxComponent;
  let fixture: ComponentFixture<RbbuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbbuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbbuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
