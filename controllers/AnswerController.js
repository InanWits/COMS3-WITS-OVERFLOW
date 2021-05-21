const answerModel = require('../models/AnswerModel');
const answerConstants = require('../utils/constants/AnswerConstants');
const responseHandler = require('../utils/services/ResponseHandler');
const rateModel = require(`../models/RateModel`);

const express = require('express');

const router = express.Router();

const http = require('http');
const formidable = require('formidable'); // here we call the formidable module
const fs = require('fs'); // call the fs module for rename file and store file in our specified folder

router.post('/', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        const answerJsonObj = {};
        answerJsonObj[answerConstants.student_id] = fields[answerConstants.student_id];
        answerJsonObj[answerConstants.question_id] = fields[answerConstants.question_id];
        answerJsonObj[answerConstants.answer] = fields[answerConstants.answer];

        //trim removes empty spaces
        if (files.answer_picture_url == null){ //file was not uploaded
            answerJsonObj[answerConstants.answer_picture_url] = "";
            answerModel.insertAnswer(answerJsonObj).then(
                (response) => responseHandler.sendResponseOkay(response, res),
                (err) => responseHandler.sendNotAcceptableResponse(err, res)
            );
        }
        else{
            const fileName = files.answer_picture_url.name;
            const fileOldPath = files.answer_picture_url.path;

            const fileNewPath = 'Image/' + fileName;
            fs.rename(fileOldPath, fileNewPath, (err) => {
                if (err){
                    responseHandler.sendNotAcceptableResponse(err.message, res)
                }
                else{
                    answerJsonObj[answerConstants.answer_picture_url] = fileNewPath;
                    answerModel.insertAnswer(answerJsonObj).then(
                        (response) => responseHandler.sendResponseOkay(response, res),
                        (err) => responseHandler.sendNotAcceptableResponse(err, res)
                    );
                }
            });
        }

    });
});

//router.post(`/:${answerConstants.id}/vote`, (req, res) => {
    /*
    *
    student_id : "student_id",
    answer : "answer",
    vote: "vote",
    */

    //const answerJsonObj = req.body; //retrieves the json
    //attach answerId to answerJsonObj

    //call model
//});
router.post(`/:${answerConstants.answer_id}/vote`,(req, res) => {
    /*
    * question_id
    * student_id
    * answer
    * vote
    */

    //Json object with the answer information
    const answerJsonObj = req.body;

    });

module.exports = router;
