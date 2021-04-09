const db = require('../utils/services/database');

const answerConstants = require('../utils/constants/AnswerConstants');

const queryHelper = require('../helpers/QueryHelper');


module.exports = {

    insertStudent: async (AnswerJsonObject) => {
        /*
        * QuestionJsonObject is a json object in this format
        * {
        *
        *
        *   student_id : "123456",
        *   answer : "answer here",
        *   post_date_time: "post_date_time"
        *}
        * */
        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [answerConstants.answer_id, answerConstants.question_id, answerConstants.student_id,
                answerConstants.answer, answerConstants.post_date_time];

            const insertAnswer = queryHelper.buildInsertQuery(answerConstants.table_name, columnsToBeInserted, AnswerJsonObject);

            console.log(insertAnswer);

            db.getConnection().query(insertAnswer, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Answer posted!");
                }
            });
        });
    }
}