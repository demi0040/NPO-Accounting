import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DonorComponent } from './pages/donor/donor.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'donor', component: DonorComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
