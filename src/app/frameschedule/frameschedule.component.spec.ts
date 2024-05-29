import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramescheduleComponent } from './frameschedule.component';

describe('FramescheduleComponent', () => {
  let component: FramescheduleComponent;
  let fixture: ComponentFixture<FramescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FramescheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FramescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
