import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisConfigurationComponent } from './axis-configuration.component';

describe('AxisConfigurationComponent', () => {
  let component: AxisConfigurationComponent;
  let fixture: ComponentFixture<AxisConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
