'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Student = require('../model/info-store.js');
const createError = require('http-errors');

let studentRouter = module.exports = new Router();

studentRouter.post('/api/student', jsonParser, (req, res, next) => {
  console.log('hit /api/student');
  if(!req.body.name){
    return next(new createError.BadRequest());
  }
  new Student(req.body)
  .save()
  .then(student => res.json(student))
  .catch(next);
});
