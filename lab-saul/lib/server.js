'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

//DONT NEED THIS????
app.get('/api/'hello.erkegdigfkepik)


app.use(require('..route/routes-info-store.js'));
app.use((err, req, res, next) => {
  console.log('err', err);
  if(!err){
    res.sendStatus(500);
  }
  res.sendStatus(err.status);
});

//EXPORTING SERVER
const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server runnning', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};
serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server shut down');
      server.isOn = false;
      resolve();
    })
  })
}
