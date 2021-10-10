import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from'@angular/common/http/testing';


import { DealerRegisterComponent } from './dealer-register.component';

describe('DealerRegisterComponent', () => {
  let component: DealerRegisterComponent;
  let fixture: ComponentFixture<DealerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerRegisterComponent ],
      imports:[FormBuilder,RouterTestingModule,HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
