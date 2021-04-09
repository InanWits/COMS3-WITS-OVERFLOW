const studentModel = require('../models/StudentModel');

const studentConstants = require('../utils/constants/StudentConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

/*
* StudentJsonObject is a json object in this format
* {
*student_id : "1918469",
* user_name : "Tt",
* first_name : "Thabelang",
* last_name : "Ncube",
* email : "1918469@students.wits.ac.za",
* date_of_birth : "2004-06-20", //YYYY-MM-DD
* password : "password"
* }
* */

router.post('/', (req, res) => {
    const studentJsonObj = req.body;
    studentModel.insertStudent(studentJsonObj).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

/*
* req.params -> user_name
* inputs:
* {
* password: user_password
* }
*
* output:
* success -> (message) -> login success
* failed -> (message) -> Authorization failed due to bad credentials
* */

router.post(`/:${studentConstants.user_name}`, (req, res) => {
    const userName = req.params[studentConstants.user_name];
    req.body[studentConstants.user_name] = userName;

    studentModel.loginStudent(req.body).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    );
});

/*
* input: none
* outputs:
* success -> (jsonArray) ->
* [
* {
* "student_id": "1918469"
* "first_name": "Thabelang"
* "last_name": "Ncube"
* },
*
* {
* "first_name": "some student"
* "last_name": "some last name"
* }
*
* {
* "first_name": "dsfas"
* "last_name": "asdf"
* }
* ]
* failure -> (message) -> error message
*
* */

router.get('/', (req, res) => {
    studentModel.getAllStudents().then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

module.exports = router;
