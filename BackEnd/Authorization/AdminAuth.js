
const member=require('./FarmerSchema');
const dealer=require("./DealerSchema");
const admin=require("./AdminSchema");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const secretKey=require('./config');
const axios=require("axios");

exports.login=(req,res,next)=>{
    member.findOne({
        email:req.body.email
    })
    .exec()
    .then((user)=>{
        if(!user){
            return res.status(401).json({
                message:"auth failed"
            });
        }else{
            bcrypt.compare(req.body.password,user.password,(err,response)=>{
                if(err){
                    return res.status(401).json({
                        message:"auth failed"
                    });
                }else if (response){
                    const token=jwt.sign({
                        userId:user._id
                    },
                    secretKey.secretKey,
                    {
                        expiresIn:"1h"
                    });
                    return res.status(200).json({
                        message:"auth successful",
                        userId:user._id,
                        name:user.name,
                        email:user.email,
                        role:user.role,
                        token:token
                    });
                }else{
                    return res.status(401).json({
                        message:"auth failed"
                    });
                }
            });
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}


exports.signup=(req,res,next)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({
            message:"name,email and password fields are mandatory"
        })
    }

    member.find({
        email:req.body.email
    })
    .exec()
    .then((user)=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"member already exists"
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const Member=new member({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        mobile:req.body.mobile,
                        role:req.body.role,
                        status:req.body.status
                    });
                    Member.save()
                    .then((result)=>{
                        console.log(result);
                        res.status(201).json({
                            message:"login successful",
                            user:result
                        });
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            reg_error:err
                        });
                    });
                }
            });
        }
    });
}