//import libraries
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const core=require("./adminCore");
const axios=require("axios");

const { secretKey } = require("./config");

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));


//checking Authorization in middleware
const CheckAuth=(req,res,next)=>{
    try{
        const token =req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded=jwt.verify(token,secretKey);
        req.userdata=decoded;
    next();
    } catch(error){
        return res.status(401).json({
            message:"Auth failed in middleware",
        })
    }
}

//for browsers only
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
})

//connecting to database
const dbURI="Enter mongodb url for CropdealADMIN" 

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("admin database connected")
})
.catch((err)=>{
    console.log("db connection error:" + err);
});


//get all details
app.get("/admin",CheckAuth,core.get_admins);

//get admin by id
app.get("/admin/:id",CheckAuth,core.get_admin_by_id)

// login dealer user
app.post("/login",core.admin_login);


 //register new dealer
app.post('/register',core.admin_register);


 //edit admin deatils
app.put("/:id",CheckAuth,core.admin_edit_by_id);


//delete admin details
app.delete("/:id",CheckAuth,core.admin_delete_by_id)

//handing server errors
app.use((req,res,next)=>{
    const error=new Error("Not found");
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})



adminserver=app.listen("2000",()=>console.log("admin server is running on 2000"));

module.exports=adminserver
 
//401-unauthorised
//500 server down
//402 register error or mongoose error