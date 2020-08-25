const mongoose= require('mongoose');
var employeeSchema= new mongoose.Schema({
     id:mongoose.Schema.Types.ObjectId,
    fullName:{
        type:String
    },
    email:{
        type:String 
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }

});
module.exports=mongoose.model('Employee',employeeSchema);