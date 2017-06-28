'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  class: {type: Number, required: true},
  grade: {type: Number, required: true},
  gender: {type: String, required: false},
  race: {type: String, required: false},
});

module.exports = mongoose.model('student', studentSchema);
