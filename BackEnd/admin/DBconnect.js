const mongoose=require("mongoose");
const dbURI="Enter mongodb url for CROP";

function connect(){
    return new Promise((resolve,reject)=>{
        if(process.env.NODE_ENV ==='test'){
            const Mockgoose=require("mockgoose").Mockgoose;
            const mockgoose=new Mockgoose(mongoose);
            mockgoose.prepareStorage()
            .then(()=>{
                mongoose.connect(dbURI,{useNewUrlParser:true,
                    useUnifiedTopology:true,
                    useCreateIndex:true,
                    useFindAndModify:true
                }).then((res,err)=>{
                    if (err) return reject(err);
                    resolve();
                }) 
            })
        }else{
            mongoose.connect(dbURI,{useNewUrlParser:true,
                useUnifiedTopology:true,
                useCreateIndex:true,
                useFindAndModify:true
            }).then((res,err)=>{
                if (err) return reject(err);
                resolve();
            }) 
        }

    })
}

function close(){
    return mongoose.disconnect();
}

module.exports={ connect, close };