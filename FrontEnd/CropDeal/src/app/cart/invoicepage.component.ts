import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { crop } from '../observables';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-invoicepage',
  templateUrl: './invoicepage.component.html',
  styleUrls: ['./invoicepage.component.css']
})
export class InvoicepageComponent implements OnInit {

  constructor(private invoiceservice:InvoiceService,
    private router:Router, private profileservice:ProfileService ) { }
  paymentHandler:any=null;
   add:any | crop[];
   total=0;
    data=true;
  ngOnInit(): void {
    if(!this.profileservice._id.length){
      console.log(!this.profileservice._id.length);
      this.data=false
    }
    this.invoiceservice.getCartItems().subscribe(data=>{
      console.log(data);
      this.add=data;
      this.invoiceservice.cart=data
    })
  }

//remove all
  clearTable() {
    this.invoiceservice.deleteCart().subscribe(data=>{
      this.add=data
    })    
  }

//total amount
  check(){
  return this.add.map((t: { crop_price: any; }) => 
  t.crop_price).reduce((acc: any, value: any) => acc + value, 0);
  }
 
//generate invoice
  buynow(){
    
    this.invoiceservice.amount=this.check()
    this.router.navigateByUrl("receipt");
  }
  // deleting particular element
  remove(value:crop[]){
    this.invoiceservice.deleteCartItem(value).subscribe(data=>{
      this.add=data
     })
  }
//add element to cart
  addData() {
    this.router.navigateByUrl("product") 
  }

  displayedColumns: string[] = ['CROP NAME', 'CROP TYPE','QUANTITY','COST'];
}
