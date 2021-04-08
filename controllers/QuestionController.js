const questionModel = require('../models/QuestionModel');

//const questionConstants = require('../utils/constants/QuestionConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const questionJsonObj = req.body;
    questionModel.insertQuestion(questionJsonObj).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

module.exports = router;
