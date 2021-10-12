
var mongoose = require('mongoose');

var schema = mongoose.Schema;
var Schema = new schema({
  email:{type:String,required:true,unique:true, match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
  firstname: { type: String,required:true, match: /^[a-zA-Z ]*$/},
  lastname: { type: String,required: true},
  password: { type: String,required: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserDetails', Schema);