import { Injectable } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class NgDynamicBreadcrumbServiceService {

  constructor(private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) { }
  updateBreadcrumb(): void {
    
    const breadcrumbs  =  [
      {
        label: 'page {{pageOneID}}',
        url: '/page1/:pageOneID'
      },
      {
        label: 'page {{pageTwoID}}',
        url: 'page1/:pageOneID/page2/:pageTwoID'
      },
      {
        label: 'page {{pageThreeID}}',
        url: 'page1/:pageOneID/page2/:pageTwoID/page3/:pageThreeID'
      },
      {
        label: 'Update Breadcrumb',
        url: ''
      }
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);

  }
  }

