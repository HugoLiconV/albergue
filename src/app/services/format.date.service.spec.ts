import { TestBed, inject } from '@angular/core/testing';

import { FormatDateService } from './format.date.service';

describe('Formate.DateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatDateService]
    });
  });

  it('should be created', inject([FormatDateService], (service: FormatDateService) => {
    expect(service).toBeTruthy();
  }));
});
