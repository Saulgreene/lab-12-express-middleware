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
    it('should return a 400 err', () => {
      return superagent.post(`${API_URL}/api/student`)
      .send({})
      .catch(err =>{
        expect(err.status).toEqual(400);
      });
    });
    it('should return a 409 err', () => {
      return superagent.post(`${API_URL}/api/student`)
      .send(tempStudentOne)
      .catch(err =>{
        expect(err.status).toEqual(409);
      });
    });
  });
  describe('test GET /api/student', () => {
    it('should return a student with characteristics', () =>{
      return superagent.get(`${API_URL}/api/student/${tempStudent._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempStudent._id);
        expect(res.body.name).toEqual('arianna');
        expect(res.body.class).toEqual(101);
        expect(res.body.grade).toEqual(84);
        expect(res.body.gender).toEqual('female');
        expect(res.body.race).toEqual('latina');
        expect(res.body.created).toEqual(tempStudent.created);
      });
    });
    it('should return a 404', () =>{
      return superagent.get(`${API_URL}/api/student/${tempStudent._id}`)
      .catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });
  describe('test PUT /api/student', () =>{
    it('should return a student', () => {
      return superagent.put(`${API_URL}/api/student/${tempStudent._id}`)
      .send({grade: 100})
      .then(res =>{
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('arianna');
        expect(res.body.class).toEqual(101);
        expect(res.body.grade).toEqual(100);
        expect(res.body.gender).toEqual('female');
        expect(res.body.race).toEqual('latina');
        tempStudent = res.body;
      });
    });
    it('should respond 404', () => {
      return superagent.put(`${API_URL}/api/student/8776`)
      .catch(err => {
        expect(err.status).toEqual(404);
      });
    });
    //cant get this to work!!!!!!!!!!!VVVVVVVVVVVV
    it('should return a student', () => {
      return superagent.put(`${API_URL}/api/student/${tempStudent._id}`)
      .send({})
      .catch(err =>{
        expect(err.status).toEqual(400);
      });
    });
  });
  describe('test DELETE /api/student', () =>{
    it('should respond 404', () => {
      return superagent.delete(`${API_URL}/api/student/8776`)
      .catch(err => {
        expect(err.status).toEqual(404);
      });
    });
    it('should delete a student', () => {
      return superagent.delete(`${API_URL}/api/student/${tempStudent._id}`)
      .then(res =>{
        expect(res.status).toEqual(204);
      });
    });
  });
});
