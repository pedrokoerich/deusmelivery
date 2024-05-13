import { TestBed } from '@angular/core/testing';

import { GlobalsService } from './globals.service';
import { beforeEach, describe, it } from 'node:test';

describe('GlobalsService', () => {
  let service: GlobalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
function expect(service: GlobalsService) {
  throw new Error('Function not implemented.');
}

