const mongoose = require('mongoose');
const Schema   = mongoose.Schema

var todoSchema = new Schema({
  description    : String, //dipake FB name masuk sini
  date           : String, //not required if login by fb
  complete       : Boolean, //link
  categories     : [String], //requred
  // userId         : {
  //   type:Schema.Types.ObjectId,
  //   ref: 'user'
  // }
  userId        : String
},
{ timestamps: true}
);

var todo = mongoose.model('todo', todoSchema)
module.exports = todo;
