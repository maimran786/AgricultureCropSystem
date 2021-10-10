var express=require('express');
var stripe=require('stripe') ('pk_test_51JdcINKYnblxHWUnmCeOMLaO2db9xd146eeSVLpKH2XQlziTtEAgwpVGqjOs3RnZ17ovcejVc21n93b0vtliMLtq00iD7ivaYV');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var cors=require('cors');
var originWhitelist=[
    'http://localhost:4200'
];
var corsOptions={
    origin:function(origin,callback){
        var isWhitelisted=this.originsWhitelist
        callback(null,isWhitelisted);
    },
}

app.use((req,res,next)=>{
    console.log(req);
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
  })
 app.use(cors(corsOptions));
  app.post('/paynow',(req,res)=>{
    console.log('The body is',req.body);
    var charge=stripe.charges.create({
        amount:req.body.amount,
        currency:'INR',
        source:req.body.token
    },(err,charge)=>{
        if(err){
            throw err;
        }
        res.json({
            success:true,
            message:"Payment done"
        })
    });
})

app.listen(4242,()=>{
    console.log('server starts at port 4242');
});