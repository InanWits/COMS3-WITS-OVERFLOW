const answerModel = require('../models/AnswerPictureModel');

const answerPictureConstants = require('../utils/constants/AnswerPictureConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const answerPictureJsonObj = req.body;
    answerModel.insertAnswerPicture(answerPictureJsonObj).then(
        (response) => {
            responseHandler.sendResponseOkay(response, res);
        },
        (err) => {
            responseHandler.sendNotAcceptableResponse(err, res);
        }
    )
});

module.exports = router;