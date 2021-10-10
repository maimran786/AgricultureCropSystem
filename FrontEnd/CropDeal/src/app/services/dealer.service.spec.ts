import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from'@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { DealerService } from './dealer.service';

describe('DealerService', () => {
  let service: DealerService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule,HttpClientModule]});
    service = TestBed.inject(DealerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
