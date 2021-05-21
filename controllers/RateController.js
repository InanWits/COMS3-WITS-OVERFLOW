const rateModel = require('../models/RateModel');

const rateConstants = require('../utils/constants/RateConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();



router.post(`/:${rateConstants.answer_id}/vote`,(req, res) => {
    const answerId = req.params[rateConstants.answer_id];
    req.body[rateConstants.answer_id] = answerId;


    rateModel.vote(req.body).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});

module.exports = router;
