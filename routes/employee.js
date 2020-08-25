
const express= require('express');
const mongoose= require('mongoose');
const Employee= require('../models/employee');
var router= express.Router();
router.get('/',(req,res,next)=>{
    Employee.find()
    .exec()
    .then(docs => {
      const response={
          count: docs.length,
          employees:docs.map(doc=>{
              return{
                  fullname:doc.name,
                  email: doc.email,
                  mobile: doc.mobile,
                  city:doc.city,
                  _id:doc._id,
                  request:
                  {
                      type:'GET',
                      url:'http://localhost:7000/employee/'+doc._id
                  }
              }
          })
      };
      res.json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post('/',(req,res,next)=>{
    
const emp= new Employee({
    _id: new mongoose.Types.ObjectId(),
    fullname:req.body.name,
    email:req.body.email,  
    mobile:req.body.mobile,
    city:req.body.city
});
emp.save()
.then(result => {
  console.log(result);
  res.status(201).json({
    message: "Handling POST requests to /products",
    createdEmployee: result,
    message: "Created product successfully",
    createdEmployee: {
        fullname: result.name,
        email:result.email,  
    mobile:result.mobile,
    city:result.city,
    
        request: {
            type: 'GET',
            url: "http://localhost:7000/employee/" + result._id
        }
    }
  });
})
.catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
});
});
router.get('/:employeeId',(req,res,next)=>{
 const id= req.params.employeeId
   Employee.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
        res.status(200).json({
            employee: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/employee'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.patch('/:employeeId',(req,res,next)=>{
    const id= req.params.employeeId
    const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Employee.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(200).json(result);
      res.status(200).json({
          message: 'Employee updated',
          request: {
              type: 'GET',
              url: 'http://localhost:7000/employee/' + id
          }
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
   
router.delete('/:employeeId',(req,res,next)=>{
    const id = req.params.employeeId;
    Employee.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
      res.status(200).json({
          message: 'Employee deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:7000/employee',
              body: { fullname: 'String', email: 'String' ,mobile:'String',city:'String'}
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports= router;