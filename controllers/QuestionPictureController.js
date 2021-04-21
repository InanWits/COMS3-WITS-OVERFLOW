const answerModel = require('../models/QuestionPictureModel');

const answerConstants = require('../utils/constants/QuestionPictureConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const questionPictureJsonObj = req.body;
    answerModel.insertQuestionPicture(questionPictureJsonObj).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

module.exports = router;