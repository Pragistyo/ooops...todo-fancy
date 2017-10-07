require('dotenv').config()
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const user = require('../models/user');
const FB   = require('fb');

console.log('masuk controllers');
class LoginController{

  static allData(req,res){
    user.find().then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send('ERROR --> '+ err)
    })
  }

  static postData(req,res){
    user.create({
      userId   :  req.body.userId,//klo pake fb, keisi fbID, klo engga bikin auto increment
      username :  req.body.username, //dipake FB name masuk sini
      password :  req.body.password || '', //not required if login by fb
      img      :  req.body.img, //link
      email    :  req.body.email

    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static singleData(){

  }

  static updateData(){

  }

  static deleteData(){

  }

  static setFBAccessToken(req,res,next){
    console.log('===========', req.headers.fb_access_token);
    FB.setAccessToken(req.headers.fb_access_token);
    next()
  }

  static getUserFB(req,res){
    FB.api('/me',{fields: ['id','name','email','picture.type(large)']},response=>{
      res.send(response)
    })
  }

  static loginFB(req,res){ //ngepost ke dalem ntar aja
    console.log('aosnasofnasofn');
    res.send('masuk loginFB')
    // user.findOne({userId: req.headers.fbid})
    // .then(user =>{
    //   if(!user)
    //     FB.api('/me',{fields: ['id','name','email','picture']},response=>{
    //       user.create({
    //         userId:response.id,
    //         username:response.name,
    //         img: response.picture.data.url,
    //         email:response.email
    //       })
    //       .then(userlogin =>{
    //         let token = jwt.sign({
    //           _id    : userlogin._id,
    //           userId : userlogin.userId,
    //           name   : userlogin.usernmae,
    //           email  : userlogin.email,
    //           img    : userlogin.img
    //         }, process .env.SECRET_KEY)
    //         res.send({thisToken:token,msg:"token launched"})
    //       }).catch(err => res.send(err))
    //     })
    //   else{
    //     let token = jwt.sign({
    //       _id  : user._id,
    //       name : user.name
    //     }, process.env.SECRET_KEY)
    //     res.send({thisToken:token,msg:"token launched"})
    //   }
    // })
    // .catch(err=>res.send(err))
  }


}






module.exports = LoginController
