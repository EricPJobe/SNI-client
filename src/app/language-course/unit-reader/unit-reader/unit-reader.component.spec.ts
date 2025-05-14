import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitReaderComponent } from './unit-reader.component';

describe('UnitReaderComponent', () => {
  let component: UnitReaderComponent;
  let fixture: ComponentFixture<UnitReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
