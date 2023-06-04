import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor() { }

  private pageTitle: string = 'My PAGE';

  getPageTitle(): string {
    return this.pageTitle;
  }

  setPageTitle(title: string): void {
    this.pageTitle = title;
  }
}
