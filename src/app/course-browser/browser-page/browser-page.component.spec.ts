import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserPageComponent } from './browser-page.component';

describe('BrowserPageComponent', () => {
  let component: BrowserPageComponent;
  let fixture: ComponentFixture<BrowserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
