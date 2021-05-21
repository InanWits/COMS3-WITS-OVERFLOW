const db = require('../utils/services/database');

const answerConstants = require('../utils/constants/AnswerConstants');

const queryHelper = require('../helpers/QueryHelper');


module.exports = {

    insertAnswer: async (AnswerJsonObject) => {
        /*
        * QuestionJsonObject is a json object in this format
        * {
        *
        *
        *   "student_id" : "123456",
        *   "question_id" : "1",
        *   "answer" : "answer here"
        *   "answer_picture_url" : "picture here"
        *
        *}
        * */
        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [answerConstants.student_id, answerConstants.question_id, answerConstants.answer, answerConstants.answer_picture_url];

            const insertAnswer = queryHelper.buildInsertQuery(answerConstants.table_name, columnsToBeInserted, AnswerJsonObject);

            console.log(insertAnswer);

            db.getConnection().query(insertAnswer, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    },

    readAnswers: async (questionId) => {
        return new Promise((resolve, reject) => {

            const whereCondition = {
                [answerConstants.question_id] : questionId
            };

            const selectAnswers = queryHelper.buildSelectQuery(answerConstants.table_name, [], whereCondition);

            console.log(selectAnswers);

            db.getConnection().query(selectAnswers, (err, result) => {
                if (err){
                    reject(err.message);
                }
                else{
                    resolve(result);
                }
            });
        });
    }

}
