import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from'@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { CropServiceService } from './crop-service.service';

describe('CropServiceService', () => {
  let service: CropServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule,HttpClientModule]});
    service = TestBed.inject(CropServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
