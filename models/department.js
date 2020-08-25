const mongoose = require('mongoose');

const deptSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    assigned: { type: Boolean, default: false }
});

module.exports = mongoose.model('Department', deptSchema); 