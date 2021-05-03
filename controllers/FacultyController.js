const facultyModel = require('../models/FacultyModel');
const schoolModel = require('../models/SchoolModel');

const schoolConstants = require('../utils/constants/SchoolConstants');
const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const answerJsonObj = req.body;
    facultyModel.insertFaculty(answerJsonObj).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    )
});

router.get('/', (req, res) => {
    facultyModel.readAllFaculties().then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

router.get(`/:${schoolConstants.faculty_id}/schools`, (req, res) => {
    const facultyId = req.params[schoolConstants.faculty_id];
    schoolModel.readSchools(facultyId).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

module.exports = router;
