const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const cors       = require('cors');
const app        = express();

mongoose.connect('mongodb://ogitamvan:I95i994!@cluster0-shard-00-00-tptia.mongodb.net:27017,cluster0-shard-00-01-tptia.mongodb.net:27017,cluster0-shard-00-02-tptia.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',(err)=>{
  // mongoose.connect('mongodb://admin:123@cluster0-shard-00-00-jgxqq.mongodb.net:27017,cluster0-shard-00-01-jgxqq.mongodb.net:27017,cluster0-shard-00-02-jgxqq.mongodb.net:27017/bedekan?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',(err)=>{
  if(!err){
    console.log('CONNECTED mongoose');
  }else{
    console.log('NOT CONNECT mongoose ', err);
  }
})


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const login = require('./routes/login.js');
const todo  = require('./routes/todo.js');


app.use('/login',login)
// console.log('hah');
app.use('/todo',todo)


app.listen(process.env.PORT || 3000,()=>{
  console.log('Port 3000, Ready !');
})
