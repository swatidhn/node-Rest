const db= require('mongoose');
require('./employee');
const uri='mongodb://localhost:27017/swati'
db.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{

    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log('connected');
    }
});
