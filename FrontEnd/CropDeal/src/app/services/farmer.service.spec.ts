import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from'@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { FarmerService } from './farmer.service';

describe('FarmerService', () => {
  let service: FarmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule,HttpClientModule]});
    service = TestBed.inject(FarmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
