import { TestBed } from '@angular/core/testing';

import { DynChartService } from './dyn-chart.service';

describe('DynChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynChartService = TestBed.get(DynChartService);
    expect(service).toBeTruthy();
  });
});
