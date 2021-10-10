import { ComponentFixture, TestBed } from '@angular/core/testing';


import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from'@angular/common/http/testing';



import { InvoicepageComponent } from './invoicepage.component';

describe('InvoicepageComponent', () => {
  let component: InvoicepageComponent;
  let fixture: ComponentFixture<InvoicepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicepageComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
