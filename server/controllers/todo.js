// const mongoose = require('mongoose');
const todo     = require('../models/todo');

console.log('==== todo controller')

class TodoController{

  static allData(req,res){

      todo.find({}).sort({date:'ascending'}).then(result=>{
        res.send(result)
      })
      .catch(err=>{
        res.send(err)
      })

  }

  static postData(req,res){
    todo.create({
      description: req.body.description,
      date: req.body.date,
      complete: req.body.complete,
      categories: req.body.categories,
      userId :req.body.userId
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static categoryData(req,res){ //by category
    console.log('masuk category data');
    todo.find({userId: req.params.id})
    .then(singletodo=>{
      console.log(singletodo,' wuahahah');
      res.send(singletodo)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static updateData(req,res){
    console.log('============ masuk update');
    todo.findOneAndUpdate({_id:req.params.id},{
      complete: req.body.complete
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static deleteData(req,res){
    todo.remove({_id:req.params.id})
    .then(result=>{
      res.send({
        msg: 'REMOVED',
        data:result
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }
}






module.exports = TodoController
// router.get('/', todo.allData);
// router.post('/', todo.postData);
// router.get('/:id', todo.singleData);
// router.put('/:id', todo.updateData);
// router.delete('/:id', todo.deleteData);
