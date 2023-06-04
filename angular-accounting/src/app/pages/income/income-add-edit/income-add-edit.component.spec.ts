import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAddEditComponent } from './income-add-edit.component';

describe('IncomeAddEditComponent', () => {
  let component: IncomeAddEditComponent;
  let fixture: ComponentFixture<IncomeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
