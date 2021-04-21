const db = require('../utils/services/database');

const  questionPictureConstants = require('../utils/constants/QuestionPictureConstants');

const queryHelper = require('../helpers/QueryHelper');

module.exports = {
    /*
     * QuestionPictureJsonObject is a json object in this format
     * {
     *   question_id : "123456",
     *   question_picture : "picture ?"
     *}
     * */
    insertQuestionPicture: async (QuestionPictureJsonObject) => {

        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [ questionPictureConstants.question_id, questionPictureConstants.question_picture_url];

            const insertQuestionPicture = queryHelper.buildInsertQuery(questionPictureConstants.table_name, columnsToBeInserted, QuestionPictureJsonObject);

            console.log(insertQuestionPicture);

            db.getConnection().query(insertQuestionPicture, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Question  picture posted!");
                }
            });
        });
    }
}