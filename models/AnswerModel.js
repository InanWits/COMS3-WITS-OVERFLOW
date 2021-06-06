const db = require('../utils/services/database');
const studentConstants = require('../utils/constants/StudentConstants')
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

            const getAnswers = queryHelper.buildAssociatedInnerJoin(
                [answerConstants.table_name,studentConstants.table_name]
                , [answerConstants.student_id, answerConstants.student_id]
                ,[[answerConstants.question_id, answerConstants.answer_id, answerConstants.post_date_time,answerConstants.answer,answerConstants.answer_picture_url],[studentConstants.user_name]]
                , true, [], whereCondition);


            console.log(getAnswers);

            db.getConnection().query(getAnswers, (err, result) => {
                if (err){
                    reject(err.message);
                }
                else{
                    module.exports.getAnswerVote(0, result).then(result => {
                        resolve(result);
                    });
                }
            });
        });
    },

    getAnswerVote: async (i, result) => {
        return new Promise((resolve) => {
            if (i === result.length) resolve(result);

            const answer = result[i];

            db.getConnection().query(`select count(*) as total from Rate where answer_id = ${answer.answer_id}`, (err, rslt) => {
                let totalVotes;

                if (rslt.length === 0){
                    totalVotes = 0;
                }
                else{
                    totalVotes = rslt[0].total;
                }

                answer["total_votes"] = totalVotes;
                result[i] = answer;
                i++;

                resolve(module.exports.getAnswerVote(i, result));
            });
        });
    }

}
