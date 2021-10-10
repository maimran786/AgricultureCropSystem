import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from'@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule,HttpClientModule]});
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
