import { Component } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private pageTitleService: PageTitleService) { }

  getPageTitle(): string {
    return this.pageTitleService.getPageTitle();
  }
}
