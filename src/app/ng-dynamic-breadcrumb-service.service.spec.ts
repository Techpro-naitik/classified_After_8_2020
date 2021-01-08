import { TestBed } from '@angular/core/testing';

import { NgDynamicBreadcrumbServiceService } from './ng-dynamic-breadcrumb-service.service';

describe('NgDynamicBreadcrumbServiceService', () => {
  let service: NgDynamicBreadcrumbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgDynamicBreadcrumbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
