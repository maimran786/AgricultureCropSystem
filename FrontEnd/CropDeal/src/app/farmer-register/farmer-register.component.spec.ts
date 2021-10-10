import { ComponentFixture, TestBed } from '@angular/core/testing';


import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from'@angular/common/http/testing';


import { FarmerRegisterComponent } from './farmer-register.component';

describe('FarmerRegisterComponent', () => {
  let component: FarmerRegisterComponent;
  let fixture: ComponentFixture<FarmerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerRegisterComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
