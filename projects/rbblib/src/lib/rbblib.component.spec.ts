import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbblibComponent } from './rbblib.component';

describe('RbblibComponent', () => {
  let component: RbblibComponent;
  let fixture: ComponentFixture<RbblibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbblibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbblibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
