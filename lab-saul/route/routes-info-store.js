'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Student = require('../model/info-store.js');
const createError = require('http-errors');

let studentRouter = module.exports = new Router();

studentRouter.post('/api/student', jsonParser, (req, res, next) => {
  console.log('hit /api/student');
  if(!req.body.name){
    return next(createError(400));
  }
  new Student(req.body)
    .save()
    .then(student => res.json(student))
    .catch(next);
});

studentRouter.get('/api/student/:id', (req, res, next) => {
  console.log('hit get /api/student/:id');

  Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(next);
});

studentRouter.put('/api/student/:id', jsonParser, (req, res, next) =>{
  console.log('hit put /api/student');


  Student.findOneAndUpdate(req.params.id, req.body,{new: true})
    .then(student => res.json(student))
    .catch(next);
});

studentRouter.delete('/api/student/:id', (req, res, next) => {
  console.log('hit delete /api/student');
  Student.findByIdAndRemove(req.params.id)
    .then(res.sendStatus(204))
    .catch(next);
});
