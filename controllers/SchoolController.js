const schoolModel = require('../models/SchoolModel');
const topicModel = require('../models/TopicModel');
const topicConstants = require('../utils/constants/TopicCostants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const answerJsonObj = req.body;
    schoolModel.insertSchool(answerJsonObj).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

router.get(`/:${topicConstants.school_id}/topics`, (req, res) => {
    const schoolId = req.params[topicConstants.school_id];
    topicModel.readTopics(schoolId).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

module.exports = router;
