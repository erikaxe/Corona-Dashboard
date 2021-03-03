import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteractiveChartComponent } from './user-interactive-chart.component';

describe('UserInteractiveChartComponent', () => {
  let component: UserInteractiveChartComponent;
  let fixture: ComponentFixture<UserInteractiveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInteractiveChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInteractiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
