const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Department = require("../models/department");
const Employee = require("../models/employee");
router.get("/", (req, res, next) => {
    Department.find()
      .select("product quantity _id")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              department: doc.Employee,
              assigned: doc.assigned,
              request: {
                type: "GET",
                url: "http://localhost:7000/department/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  router.post("/", (req, res, next) => {
    Employee.findById(req.body.employeeId)
      .then(employee=> {
        if (!employee) {
          return res.status(404).json({
            message: "Employee not found"
          });
        }
        const department = new Department({
          _id: mongoose.Types.ObjectId(),
           assigned: req.body.assigned,
          employeeId: req.body.employeeId
        });
        return department.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "department stored",
          createdOrder: {
            _id: result._id,
            department: result.product,
            assigned: result.assigned
          },
          request: {
            type: "GET",
            url: "http://localhost:7000/department/" + result._id
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
  


  router.get("/:departmentId", (req, res, next) => {
    Department.findById(req.params.departmentId)
      .exec()
      .then(dept => {
        if (!dept) {
          return res.status(404).json({
            message: "Department not found"
          });
        }
        res.status(200).json({
         dept: dept,
          request: {
            type: "GET",
            url: "http://localhost:7000/department"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
 
  router.delete("/:departmentId", (req, res, next) => {
    Department.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:7000/department",
            body: { departmentId: "ID", assigned: "Boolean" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});
  module.exports = router;