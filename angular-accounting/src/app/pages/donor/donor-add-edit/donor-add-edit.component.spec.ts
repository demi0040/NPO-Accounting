import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorAddEditComponent } from './donor-add-edit.component';

describe('DonorAddEditComponent', () => {
  let component: DonorAddEditComponent;
  let fixture: ComponentFixture<DonorAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
