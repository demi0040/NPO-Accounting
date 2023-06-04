import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTableComponentComponent } from './income-table-component.component';

describe('IncomeTableComponentComponent', () => {
  let component: IncomeTableComponentComponent;
  let fixture: ComponentFixture<IncomeTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
