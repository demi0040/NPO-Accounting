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

}
