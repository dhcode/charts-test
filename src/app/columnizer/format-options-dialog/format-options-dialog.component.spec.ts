import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatOptionsDialogComponent } from './format-options-dialog.component';

describe('FormatOptionsDialogComponent', () => {
  let component: FormatOptionsDialogComponent;
  let fixture: ComponentFixture<FormatOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatOptionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
