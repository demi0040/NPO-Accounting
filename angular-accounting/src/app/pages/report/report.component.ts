import { Component } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  constructor(private _pageTitleService: PageTitleService) {
    this.updatePageTitle();
  }

  updatePageTitle(): void {
    const newTitle = 'Reports Page'; // Set the desired page title
    this._pageTitleService.setPageTitle(newTitle);
  }

  openTable(tableId: string): void {
    // Hide all table containers
    const tableContainers = document.querySelectorAll('.table-container');
    tableContainers.forEach(container => {
      container.classList.remove('active');
    });

    // Show the selected table container
    const selectedTableContainer = document.getElementById(tableId);
    if (selectedTableContainer) {
      selectedTableContainer.classList.add('active');
    }
  }


}
