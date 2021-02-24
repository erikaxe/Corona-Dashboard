import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalBarChartComponent } from './global-bar-chart.component';

describe('GlobalBarChartComponent', () => {
  let component: GlobalBarChartComponent;
  let fixture: ComponentFixture<GlobalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
