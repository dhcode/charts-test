import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartConfigurationComponent } from './chart-configuration.component';

describe('ChartConfigurationComponent', () => {
  let component: ChartConfigurationComponent;
  let fixture: ComponentFixture<ChartConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
