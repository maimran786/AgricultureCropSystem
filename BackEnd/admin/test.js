const expect =require ("chai").expect;
const request =require("supertest");
const assert =require("chai").assert;

const app=require("./AdminServer");
const conn=require("./DBconnect");
let token="";
let id=""

// register, login, edit, get alladmins, admin by id finally delete user
describe("POST /register ",()=>{
   
    describe("error status code",()=>{
        
        it("should give 409 status code for missing role value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"farmer",
                email:"farmer123@gmail.com",
                password:"Farmer123",
                rolel:"",
                contact:1234567891,
                gender:"MALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 409 status code for missing password value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Imran",
                email:"imran21@gmail.com",
                role:"ADMIN",
                contact:1234567891,
                gender:"MALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
               // console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 402 status code for missing email value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"MA Imran",
                role:"ADMIN",
                password:"Chai@210396",
                contact:1234567891,
                gender:"MALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(402);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 402 status code for invalid email value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Imran",
                role:"ADMIN",
                email:"email.com",
                password:"Chai@210396",
                contact:1234567891,
                gender:"MALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(402);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 402 status code for role email value",(done)=>{
            const response =request(app).post("/register")
            .send({
                email:"Testingabc@123.com",
                role:"ADMIN",
                password:"Chai@210396",
                contact:1234567891,
                gender:"MALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(402);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })

     })
     describe("new user and role should give 201 status code",()=>{
        it("create new user should give 201 status code",(done)=>{
            request(app).post("/register")
            .send({
                name:"Iamnew",
                email:"Iamnew123@gmail.com",
                password:"Chai@210396",
                role:"ADMIN",
                contact:1234567891,
                gender:"MALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.admin).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            }) 
        })

        it("login to get token of newly created user",done=>{
            request(app).post("/login")
            .send({
                name:"Iamnew",
                email:"Iamnew123@gmail.com",
                password:"Imran123",
                role:"ADMIN",
            }).then(response=>{
                //console.log(response.body);
                expect(response.statusCode).to.be.equal(200);
                this.token=response.body.token; 
                this.id=response.body.user._id             
                done()
            })
            .catch((err)=>{
                // console.log(err);
                done(err);
                throw(err);
            }) 
        })

        

        it("edit new user details should give 201 status code",(done)=>{
            console.log(this.id);
            request(app).put("/"+this.id)
            .set({"authorization":"Bearer "+this.token})
            .send({
                name:"new",
                email:"iamnew123@gmail.com",
                password:"Chai@210396",
                role:"ADMIN",
                contact:1234567891,
                gender:"MALE",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                // expect(response.body.admin).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                console.log(err);
                done(err);
                throw(err);
            }) 
        })

        

        
        })
     })

//only login
describe("POST/login",()=>{
    /*before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })*/

    describe("given user name which does not exists ",()=>{
       it("should give 401 status code",(done)=>{
            const response = request(app).post("/login")
            .send({
                name:"NotExists",
                email:"notexixt21@gmail.com",
                password:"Chai"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(401);               
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            })  
        });

    })
    describe("when the username and password is missing/mismatch",()=>{
        it("missing password should give 401 status code",(done)=>{
                const response =request(app).post("/login")
                .send({
                    name:"mismatch",
                    email:"imran21@gmail.com",
                    password:""
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(401);                
                    done()
                })
                .catch((err)=>{
                    console.log(err);
                    throw(err);
                }) 
         })

         describe("mismatch email should give 401 status code",()=>{
            it("should give 401 status code",(done)=>{
                const response =request(app).post("/login")
                .send({
                    name:"imran",
                    email:"imran@21@gmail.com",
                    password:"Chai@"
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(401);                
                    done()
                })
                .catch((err)=>{
                    console.log(err);
                    throw(err);
                })  
            })
     
         })

    }) 
    describe("when the username and password is provided properly",()=>{
         describe("exiting user and role should give 200 status code",()=>{
            it("should give 200 status code",(done)=>{
                const response =request(app).post("/login")
                .send({
                    name:"Iamnew",
                    email:"imran@gmail.com",
                    password:"Chai@210396",
                    role:"ADMIN"
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(200);
                    this.token=response.body.token               
                    done()
                })
                .catch((err)=>{
                    console.log(err);
                    done(err);
                    throw(err);
                })  
            })
     
         })

    }) 
})

//get all admin details in 
describe("GET /admin to get all admin details",()=>{
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
    
    })