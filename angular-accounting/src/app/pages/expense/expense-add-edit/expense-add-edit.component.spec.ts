import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAddEditComponent } from './expense-add-edit.component';

describe('ExpenseAddEditComponent', () => {
  let component: ExpenseAddEditComponent;
  let fixture: ComponentFixture<ExpenseAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
