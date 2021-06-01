const questionModel = require('../models/QuestionModel');
const answerModel = require('../models/AnswerModel');

const questionConstants = require('../utils/constants/QuestionConstants');

const responseHandler = require('../utils/services/ResponseHandler');

const express = require('express');

const router = express.Router();


const http = require('http');
const formidable = require('formidable'); // here we call the formidable module
const fs = require('fs'); // call the fs module for rename file and store file in our specified folder

//const path  = require('path');
//const file_name = path.basename('/Image');
//console.log(file_name);

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        const questionJsonObj = {};
        questionJsonObj[questionConstants.student_id] = fields[questionConstants.student_id];
        questionJsonObj[questionConstants.topic_id] = fields[questionConstants.topic_id];
        questionJsonObj[questionConstants.question] = fields[questionConstants.question];

        //trim removes empty spaces
        if (files.question_picture_url == null){ //file was not uploaded
            questionJsonObj[questionConstants.question_picture_url] = "";
            questionModel.insertQuestion(questionJsonObj).then(
                (response) => responseHandler.sendResponseOkay(response, res),
                (err) => responseHandler.sendNotAcceptableResponse(err, res)
            );
        }
        else{
            const fileName = files.question_picture_url.name;
            const fileOldPath = files.question_picture_url.path;
            const fileNewPath = 'Image/' + fileName;
            fs.rename(fileOldPath, fileNewPath, (err) => {
               if (err){
                   responseHandler.sendNotAcceptableResponse(err.message, res)
               }
               else{
                   questionJsonObj[questionConstants.question_picture_url] = fileNewPath;
                   questionModel.insertQuestion(questionJsonObj).then(
                       (response) => responseHandler.sendResponseOkay(response, res),
                       (err) => responseHandler.sendNotAcceptableResponse(err, res)
                   );
               }
            });
        }

    });
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




router.get(`/:${questionConstants.question_id}/answers`, (req, res) => {
    const questionId = req.params[questionConstants.question_id];
    answerModel.readAnswers(questionId).then(
        (response) => responseHandler.sendResponseOkay(response, res),
        (err) => responseHandler.sendNotAcceptableResponse(err, res)
    );
});
module.exports = router;
