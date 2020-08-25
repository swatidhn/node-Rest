   require('./models/db');
   const emp=require('./routes/employee');
   const dept=require('./routes/department');
   const express = require('express');
   const morgan= require('morgan');
   const bodyparser= require('body-parser')
   const mongoose= require('mongoose');
   var app= express();
   mongoose.Promise = global.Promise;
   app.listen(7000,()=>
   {
       console.log('started')
   })
   app.use(morgan('dev'));
   app.use(bodyparser.urlencoded({extended:false}));
   app.use(bodyparser.json());
   app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Header','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    if(req.method==='OPTIONS')
    {
       res.header('Access-Control-Allow-Methods','PUT,PATCH,DELETE,GET')
       return res.status(200).json({});
    }
    next();
    });

   app.use('/employee',emp);
   app.use('/department',dept);
   app.use((req,res,next)=>{
       const error= new Error('not found');
       error.status=404;
       next(error);

   });
   app.use((req,res,next)=>{
    res.status(err.status||500)
    res.json({
        error:{
            message:error.message
        }
    });

})