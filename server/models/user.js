const mongoose = require('mongoose');
const Schema   = mongoose.Schema

var userSchema = new Schema({
  userId   : {type:String, unique:true}, //klo pake fb, keisi fbID, klo engga bikin auto increment
  username : {type:String, unique:true}, //dipake FB name masuk sini
  password : String, //not required if login by fb
  img      : String, //link
  email    : {type:String, unique:true}
});

var user = mongoose.model('user', userSchema)
module.exports = user;
