import { Component } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _pageTitleService: PageTitleService) {
    this.updatePageTitle();
  }

  updatePageTitle(): void {
    const newTitle = 'Dashboard'; // Set the desired page title
    this._pageTitleService.setPageTitle(newTitle);
  }

}
