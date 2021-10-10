import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from'@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule,HttpClientModule]});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
