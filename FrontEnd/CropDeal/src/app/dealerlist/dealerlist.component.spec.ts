import { ComponentFixture, TestBed } from '@angular/core/testing';


import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from'@angular/common/http/testing';


import { DealerlistComponent } from './dealerlist.component';

describe('DealerlistComponent', () => {
  let component: DealerlistComponent;
  let fixture: ComponentFixture<DealerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerlistComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
