import { TestBed } from '@angular/core/testing';

import { DataUpdateNotificationService } from './data-update-notification.service';

describe('DataUpdateNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataUpdateNotificationService = TestBed.get(DataUpdateNotificationService);
    expect(service).toBeTruthy();
  });
});
