import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CropstoreComponent } from './cropstore.component';
import {HttpClientTestingModule} from'@angular/common/http/testing';



describe('CropstoreComponent', () => {
  let component: CropstoreComponent;
  let fixture: ComponentFixture<CropstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropstoreComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropstoreComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
