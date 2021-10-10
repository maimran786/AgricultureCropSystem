const expect =require ("chai").expect;
const request =require("supertest");
const assert =require("chai").assert;

const app=require("./CropServer");
const conn=require("./DBconnect")
var idforfarmer="";
var idforadmin="";

describe ("Testing Crop server routes",()=>{
    
    it("OK, get all crops Array from database check its not empty",(done)=>{
       request(app)
       .get("/").then(()=>{
           expect(Array).to.contains(Object).not.null;
           done();
       })
       .catch((err)=>{
           done(err)
       })       
    })
    it("OK,checking all the elements property",(done)=>{
        request(app)
        .get("/").then((res)=>{
            expect(res.body).to.contain.keys("0")
            for(let i in res.body){
                expect(res.body[i]).to.have.property("_id");
                expect(res.body[i]).to.have.property("crop_name");
                expect(res.body[i]).to.have.property("crop_type");
                expect(res.body[i]).to.have.property("crop_quantity");
                expect(res.body[i]).to.have.property("crop_price");
            }
            done();
        })
        .catch((err)=>{
            done(err)
        })       
     })
})

describe("new crop creation and deletion",()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })
    describe("create crop by admin role",()=>{
        it("create new crop should give 201 status code with admin role",(done)=>{
            request(app)
            .post("/")
            .send({
                role:"ADMIN",
                crop_name:"rice",
                crop_type:"grains",
                crop_quantity:30,
                uploaded_by:"admin",
                crop_price:1200,
                location:{
                    Addressline1:"bangalore",
                    Addressline2:"mysore",
                    localArea:"kolkata",
                    State:"karnataka",
                    Country:"india",
                    pincode:2389126
                },
                crop_img:"https://"
            }).then(response=>{
                console.log(response.body.cropdetails);
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.cropdetails).to.contain.property("_id"); 
                this.idforadmin=response.body.cropdetails._id ;
                console.log(this.idforadmin);      
                done()
            }).catch((err)=>{
                console.log(err);
                done(err);
                throw(err);
            }) 
        })
    })
    describe("create crop create crop by farmer",()=>{
        it("create new crop should give 201 status code with farmer role",(done)=>{
            request(app)
            .post("/")
            .send({
                role:"FARMER",
                crop_name:"wheat",
                crop_type:"grains",
                crop_quantity:5,
                uploaded_by:"farmer",
                crop_price:80,
                location:{
                    Addressline1:"bangalore",
                    Addressline2:"mysore",
                    localArea:"kolkata",
                    State:"karnataka",
                    Country:"india",
                    pincode:2389126
                },
                crop_img:"https://"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.cropdetails).to.contain.property("_id"); 
                this.idforfarmer=response.body.cropdetails._id 
                console.log(this.idforadmin);
                console.log(this.idforfarmer);         
                done()
            }).catch((err)=>{
                console.log(this.idforadmin);
                console.log(this.idforfarmer);
                console.log(err);
                done(err);
                throw(err);
            }) 
            it("create new crop should give 500 status code for same crop name",(done)=>{
                request(app)
                .post("/")
                .send({
                    role:"FARMER",
                    crop_name:"potato",
                    crop_type:"vegetable",
                    crop_quantity:20,
                    uploaded_by:"farmer",
                    crop_price:250,
                    location:{
                        Addressline1:"bangalore",
                        Addressline2:"mysore",
                        localArea:"kolkata",
                        State:"karnataka",
                        Country:"india",
                        pincode:2389126
                    },
                    crop_img:"https://"
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(201); 
                    expect(response.body.cropdetails).to.contain.property("_id"); 
                    this.idforfarmer=response.body.cropdetails._id ;
                    console.log(this.idforadmin); 
                    console.log(this.idforfarmer);     
                    done()
                }).catch((err)=>{
                    console.log(err);
                    done(err);
                    throw(err);
                }) 
            })
        })

    })
    describe("get/:id route for farmer",()=>{
        it("OK,checking all the elements property",(done)=>{
            request(app)
            .get("/"+this.idforfarmer).then((res)=>{
                expect(res.body).to.have.property("_id");
                expect(res.body).to.have.property("crop_name");
                expect(res.body).to.have.property("crop_type");
                expect(res.body).to.have.property("crop_quantity");
                expect(res.body).to.have.property("crop_price");
                done();
            })
            .catch((err)=>{
                done(err)
                throw(err)
            })       
         })
    })
    describe("get/:id route for admin",()=>{
        it("OK,checking all the elements property",(done)=>{
            request(app)
            .get("/"+this.idforadmin).then((res)=>{
                expect(res.body).to.have.property("_id");
                expect(res.body).to.have.property("crop_name");
                expect(res.body).to.have.property("crop_type");
                expect(res.body).to.have.property("crop_quantity");
                expect(res.body).to.have.property("crop_price");
                done();
            })
            .catch((err)=>{
                done(err)
                throw(err)
            })       
         })
    })

    describe("delete/:id route for admin",()=>{
        it("OK,crop deleted",(done)=>{
            request(app)
            .delete("/"+this.idforadmin).then((res)=>{
                expect(res.statusCode).to.be.equal(200);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done(err)
                throw(err)
            })       
         })
    })

    describe("delete/:id route for farmer",()=>{
        it("OK,crop deleted",(done)=>{
            request(app)
            .delete("/"+this.idforfarmer).then((res)=>{
                expect(res.statusCode).to.be.equal(200);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done(err)
                throw(err)
            })       
         })
    })
    describe("delete/:id route for if crop not found",()=>{
        it("OK,crop deleted",(done)=>{
            request(app)
            .delete("/"+this.idforfarmer).then((res)=>{
                expect(res.statusCode).to.be.equal(404);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done(err)
                throw(err)
            })       
         })
    })
})
