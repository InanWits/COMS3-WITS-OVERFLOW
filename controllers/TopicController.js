const topicModel = require('../models/TopicModel');
const questionModel = require('../models/QuestionModel');

const questionConstants = require('../utils/constants/QuestionConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const answerJsonObj = req.body;
    topicModel.insertTopic(answerJsonObj).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

router.get(`/:${questionConstants.topic_id}/questions`, (req, res) => {
    const topicId = req.params[questionConstants.topic_id];
    questionModel.readAllQuestions(topicId).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

module.exports = router;
