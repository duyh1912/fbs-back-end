const mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
  name:{
    required: true, 
    type:String},
  email:{
    required: true, 
    type:String},
  password:{
    required: true,
    type:String},
  created_at:{
    type: Date
  },
  update_at:{
    type: Date
  },
  delete_at:{
    type: Date
  },
});
var AdminModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminModel;

