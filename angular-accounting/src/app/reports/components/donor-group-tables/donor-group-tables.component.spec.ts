import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorGroupTablesComponent } from './donor-group-tables.component';

describe('DonorGroupTablesComponent', () => {
  let component: DonorGroupTablesComponent;
  let fixture: ComponentFixture<DonorGroupTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorGroupTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorGroupTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
