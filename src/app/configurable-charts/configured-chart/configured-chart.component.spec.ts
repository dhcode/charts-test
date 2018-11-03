import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredChartComponent } from './configured-chart.component';

describe('ConfiguredChartComponent', () => {
  let component: ConfiguredChartComponent;
  let fixture: ComponentFixture<ConfiguredChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguredChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguredChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
