const answerModel = require('../models/AnswerModel');

//const answerConstants = require('../utils/constants/AnswerConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const answerJsonObj = req.body;
    answerModel.insertAnswer(answerJsonObj).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

module.exports = router;