import { ComponentFixture, TestBed } from '@angular/core/testing';


import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from'@angular/common/http/testing';


import { FarmerlistComponent } from './farmerlist.component';

describe('FarmerlistComponent', () => {
  let component: FarmerlistComponent;
  let fixture: ComponentFixture<FarmerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerlistComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
