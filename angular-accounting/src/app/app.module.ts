import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DonorComponent } from './pages/donor/donor.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ReportComponent } from './pages/report/report.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { DonorAddEditComponent } from './pages/donor/donor-add-edit/donor-add-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';

import { ConfirmationDialogComponent } from './core/confirmation-dialog/confirmation-dialog.component';
import { IncomeAddEditComponent } from './pages/income/income-add-edit/income-add-edit.component';
import { ExpenseAddEditComponent } from './pages/expense/expense-add-edit/expense-add-edit.component';
import { DonorTableComponentComponent } from './tables-graphs/donor-table-component/donor-table-component.component';
import { IncomeTableComponentComponent } from './tables-graphs/income-table-component/income-table-component.component';
import { ExpenseTableComponentComponent } from './tables-graphs/expense-table-component/expense-table-component.component';
import { ExpenseChartComponentComponent } from './tables-graphs/expense-chart-component/expense-chart-component.component';
import { IncomeChartComponentComponent } from './tables-graphs/income-chart-component/income-chart-component.component';
import { IncomeExpenseComparisonComponentComponent } from './tables-graphs/income-expense-comparison-component/income-expense-comparison-component.component';

import { NgChartsModule } from 'ng2-charts';
import { DonationChartComponentComponent } from './tables-graphs/donation-chart-component/donation-chart-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DonorComponent,
    IncomeComponent,
    ExpenseComponent,
    ReportComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    DonorAddEditComponent,
    ConfirmationDialogComponent,
    IncomeAddEditComponent,
    ExpenseAddEditComponent,
    DonorTableComponentComponent,
    IncomeTableComponentComponent,
    ExpenseTableComponentComponent,
    ExpenseChartComponentComponent,
    IncomeChartComponentComponent,
    IncomeExpenseComparisonComponentComponent,
    DonationChartComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
