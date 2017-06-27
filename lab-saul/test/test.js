'use strict';

require('dotenv').config({path: `${__dirname}/../test/.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const API_URL = `http://localhost:${process.env.PORT}`;
let tempStudent;
let tempStudentOne = {
  name: 'arianna',
  class: 101,
  grade: 84,
  gender: 'female',
  race: 'latina',
};
let tempStudentTwo = {
  name: 'saul',
  class: 401,
  grade: 93,
  gender: 'male',
  race: 'white',
};
let tempStudentThree = {
  name: 'joe',
  class: 301,
  grade: 78,
};

describe('testing student information routes', () => {
  before(server.start);
  after(server.stop);

  describe('test Post /api/student', () => {
    it('should return tempStudentOne', () => {
      return superagent.post(`${API_URL}/api/student`)
      .send(tempStudentOne)
      .then(res =>{
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('arianna');
        expect(res.body.class).toEqual(101);
        expect(res.body.grade).toEqual(84);
        expect(res.body.gender).toEqual('female');
        expect(res.body.race).toEqual('latina');
        tempStudent = res.body;
      });
    });
    it('should return tempStudentThree with only the required inputs', () => {
      return superagent.post(`${API_URL}/api/student`)
      .send(tempStudentThree)
      .then(res =>{
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('joe');
        expect(res.body.class).toEqual(301);
        expect(res.body.grade).toEqual(78);
        expect(res.body.gender).toNotExist();
        expect(res.body.race).toNotExist();
        tempStudent = res.body;
      });
    });
  });
});
