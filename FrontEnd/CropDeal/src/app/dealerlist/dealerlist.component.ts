import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CropServiceService } from '../services/crop-service.service';
import { DealerService } from '../services/dealer.service';
import { FarmerService } from '../services/farmer.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-dealerlist',
  templateUrl: './dealerlist.component.html',
  styleUrls: ['./dealerlist.component.css']
})
export class DealerlistComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contact', 'gender','cropsgrown'];//add crops later
  message:any;
  selected="";
  token:any
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
  submitted=false;
  dataSource:any;
  hide=true
  data=true
  userrole:any;
  crop:String[]=[]
  constructor( private loginservice:LoginService,
    private router:Router,
     private farmerservice:FarmerService,
     private dealerservice:DealerService,
     private adminservice:AdminService,
     private profileservice:ProfileService,
     private cropservice:CropServiceService) { }

  ngOnInit(): void {
    this.userrole=this.profileservice.role
    if(!this.profileservice._id.length){
      console.log(!this.profileservice._id.length);
      this.data=false
    }
    this.submit
    this.cropservice.getcrop().subscribe(data=>{
      for(let i of data)
      {
        this.crop.push(i.uploaded_by);
      }
    })
    console.log(this.crop);
  }
 //building form
  form=new FormGroup({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[ Validators.required,Validators.email]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]),
    role:new FormControl(this.selected,Validators.required), 
  })
  //getting formcontrol value
  get f(){
    return this.form.controls;
  }
  //actions on form submit
  submit(){
      this.loginservice.login(this.form.value).subscribe(data=>{
        this.message="LogIn successfull!, Please find the Details Below"
        window.alert(this.message);
        this.token=data;
        this.submitted=true       
        if(this.form.value.role===("FARMER" || "ADMIN") ){
          this.farmerservice.getfarmer(this.token).subscribe(data=>{
          this.dataSource=data; 
                  
          })
        } 
        if(this.form.value.role ===("DEALER" || "ADMIN")){
          this.dealerservice.getdealer(this.token).subscribe(data=>{
          this.dataSource=data;
          
          })
        }
        if(this.form.value.role ==="ADMIN"){
          this.adminservice.getadmin().subscribe(data=>{
          this.dataSource=data;
          
        }) 
      } 
    })
}
}