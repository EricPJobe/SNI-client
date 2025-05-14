import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCourseUnitComponent } from './language-course-unit.component';

describe('LanguageCourseUnitComponent', () => {
  let component: LanguageCourseUnitComponent;
  let fixture: ComponentFixture<LanguageCourseUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCourseUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageCourseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
