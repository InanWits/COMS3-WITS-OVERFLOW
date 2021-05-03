const questionModel = require('../models/QuestionModel');
const answerModel = require('../models/AnswerModel');

const questionConstants = require('../utils/constants/QuestionConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const questionJsonObj = req.body;
    questionModel.insertQuestion(questionJsonObj).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    )
});

/*router.post(`/:${questionConstants.question}`, (req, res) => {
    const Question = req.params[questionConstants.question];
    req.body[questionConstants.question] = Question;

    questionModel.insertQuestion(req.body).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    );
});*/

router.get(`/${questionConstants.topic_id}`, (req, res) => {
    const topicId = req.params[questionConstants.topic_id];
    questionModel.readAllQuestions(topicId).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});


router.get(`/:${questionConstants.question_id}/answers`, (req, res) => {
    const questionId = req.params[questionConstants.question_id];

    answerModel.readAnswers(questionId).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

module.exports = router;
