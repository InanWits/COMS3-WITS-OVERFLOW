const studentModel = require('../models/StudentModel');

const studentConstants = require('../utils/constants/StudentConstants');

const responseHandler = require('../utils/services/ResponseHandler_old');

const express = require('express');

const router = express.Router();

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
