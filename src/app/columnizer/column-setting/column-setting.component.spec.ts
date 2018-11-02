import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSettingComponent } from './column-setting.component';

describe('ColumnSettingComponent', () => {
  let component: ColumnSettingComponent;
  let fixture: ComponentFixture<ColumnSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
