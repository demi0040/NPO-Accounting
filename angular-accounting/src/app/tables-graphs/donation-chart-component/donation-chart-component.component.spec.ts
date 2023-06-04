import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationChartComponentComponent } from './donation-chart-component.component';

describe('DonationChartComponentComponent', () => {
  let component: DonationChartComponentComponent;
  let fixture: ComponentFixture<DonationChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
