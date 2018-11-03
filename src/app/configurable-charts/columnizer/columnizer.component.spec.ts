import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnizerComponent } from './columnizer.component';

describe('ColumnizerComponent', () => {
  let component: ColumnizerComponent;
  let fixture: ComponentFixture<ColumnizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
