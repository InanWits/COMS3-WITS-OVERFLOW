const db = require('../utils/services/database');

const questionConstants = require('../utils/constants/QuestionConstants');

const queryHelper = require('../helpers/QueryHelper');


module.exports = {

    insertStudent: async (QuestionJsonObject) => {
        /*
        * QuestionJsonObject is a json object in this format
        * {
        *   question_id : "1",
        *   student_id : "123456",
        *   question : "question?",
        *   post_date_time: "post_date_time"
        *}
        * */
        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [questionConstants.question_id, questionConstants.student_id,
                questionConstants.question, questionConstants.post_date_time];

            const insertQuestion = queryHelper.buildInsertQuery(questionConstants.table_name, columnsToBeInserted, QuestionJsonObject);

            console.log(insertQuestion);

            db.getConnection().query(insertQuestion, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Question posted!");
                }
            });
        });
    }
}