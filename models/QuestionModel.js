const db = require('../utils/services/database');
const studentConstants = require('../utils/constants/StudentConstants');
const questionConstants = require('../utils/constants/QuestionConstants');

const queryHelper = require('../helpers/QueryHelper');


module.exports = {

    /*
       * QuestionJsonObject is a json object in this format
       * {
       * student_id : "123456"
       * topic_id : "topic"
       * question : "question?"
       * question_picture_url : "picture"
       *}
       * */
    insertQuestion: async (QuestionJsonObject) => {

        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [ questionConstants.student_id, questionConstants.topic_id, questionConstants.question,questionConstants.question_picture_url];

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
    },

   readAllQuestions: async (topicId) => {
        return new Promise((resolve, reject) => {

           const whereCondition = {
               [questionConstants.topic_id] : topicId
           };

           const selectQuestion = queryHelper.buildSelectQuery(questionConstants.table_name, [], whereCondition);

           console.log(selectQuestion);

           db.getConnection().query(selectQuestion, (err, result) => {
               if (err){
                   reject(err.message);
               }
               else{
                   resolve(result);
               }
           });

        });
    }
    /* readAllQuestions: async (topicId) => {
        return new Promise((resolve, reject) => {

            const whereCondition = {
                [questionConstants.topic_id] : topicId
            };

            const ListOfTables = [questionConstants.table_name,studentConstants.table_name];
            const ListOfOnJoinCols = [questionConstants.student_id, studentConstants.student_id];

            const selectQuestion = queryHelper.buildAssociatedInnerJoin(ListOfTables
                , ListOfOnJoinCols
                ,[[questionConstants.post_date_time,questionConstants.question,questionConstants.question_picture_url],[studentConstants.user_name]]
                , true, [], whereCondition);

            console.log(selectQuestion);

            db.getConnection().query(selectQuestion, (err, result) => {
                if (err){
                    reject(err.message);
                }
                else{
                    resolve(result);
                }
            });

        });
    } */
}
