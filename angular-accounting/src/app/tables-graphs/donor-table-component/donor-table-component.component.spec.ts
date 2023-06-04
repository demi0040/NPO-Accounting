import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorTableComponentComponent } from './donor-table-component.component';

describe('DonorTableComponentComponent', () => {
  let component: DonorTableComponentComponent;
  let fixture: ComponentFixture<DonorTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
