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

  static postData(reponseFb, req, res){
    console.log(responseFb);
    user.create({
      userId   :  responseFb.id,//klo pake fb, keisi fbID, klo engga bikin auto increment
      username :  responseFb.username, //dipake FB name masuk sini
      password :  '', //not required if login by fb
      img      :  responseFb.img, //link
      email    :  responseFb.email
    })
    .then(result=>{
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      // res.send(result)
    })
    .catch(err=>{
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      // res.send(err)
    })
  }

  static singleData(){

  }

  static updateData(){

  }

  static deleteData(req,res){
    user.remove({_id:req.params.id})
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static setFBAccessToken(req,res,next){
    console.log('===========', req.headers.fb_access_token);
    FB.setAccessToken(req.headers.fb_access_token);
    next()
  }

  static getUserFB(req,res) {
    FB.api('/me', {
      fields: ['id,name,email,picture.type(large)']
    }, response => {
      console.log(response);
      var idnya = response.id
      var namanya = response.name
      var emailnya = response.email
      var imgnya = response.picture.data.url
      var objLempar = {
        idnya:idnya,
        namanya:namanya,
        emailnya:emailnya,
        imgnya:imgnya,
      }
      // res.send(response)

      user.findOne({ userId: idnya})
      .then(userResult =>{

        if(!userResult){
          user.create({
            userId: idnya,//klo pake fb, keisi fbID, klo engga bikin auto increment
            username: namanya, //dipake FB name masuk sini
            password: '', //not required if login by fb
            img: imgnya, //link
            email: emailnya
          })
            .then(result => {
              console.log('====================================');
              console.log(result);
              console.log('====================================');
              let token = jwt.sign({
                _id        : result._id,
                userId     : result.userId,
                username   : result.usernmae,
                email      : result.email,
                img        : result.img
              }, process.env.SECRET_KEY)
              // res.send(token)
              res.send({ thisToken: token, dataFB:result, msg: "token launched" })
            })
            .catch(err => {
              console.log('====================================');
              console.log(err);
              console.log('====================================');
              // res.send(err)
            })
        } else {
          let token = jwt.sign({
            _id: userResult._id,
            userId: userResult.userId,
            username: userResult.username,
            email: userResult.email,
            img: userResult.img
          }, process.env.SECRET_KEY)
          // res.send(token)
          res.send({ thisToken: token, dataFB: userResult, msg: "token launched" })
        }
      })
    })
  }

  static getJwt(req,res) {
    console.log('akbar endut');
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
      if (!err) {
        res.send(decoded)
        next()
      }
      else {
        console.log(err)
        res.send(err)
      }
    })
  }
  // static getUserFB(req,res){ //ngepost ke dalem ntar aja
  //   user.findOne({userId: req.params.id})
  //   .then(user =>{
  //     if(!user)
  //       FB.api('/me',{fields: ['id','name','email','picture.type(large)']},response=>{
  //         user.create({
  //           userId:response.id,
  //           username:response.name,
  //           img: response.picture.data.url,
  //           email:response.email
  //         })
  //         .then(userlogin =>{
  //           let token = jwt.sign({
  //             _id    : userlogin._id,
  //             userId : userlogin.userId,
  //             name   : userlogin.usernmae,
  //             email  : userlogin.email,
  //             img    : userlogin.img
  //           }, process .env.SECRET_KEY)
  //           res.send({thisToken:token,msg:"token launched"})
  //         }).catch(err => res.send(err))
  //       })
  //     else{
  //       let token = jwt.sign({
  //         _id  : user._id,
  //         name : user.name
  //       }, process.env.SECRET_KEY)
  //       res.send({thisToken:token,msg:"token launched"})
  //     }
  //   })
  //   .catch(err=>res.send(err))
  // }
}

module.exports = LoginController
