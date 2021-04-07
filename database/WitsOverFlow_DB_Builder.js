const db = require('../utils/services/database');

const queryHelper = require('../helper/QueryHelper');

const studentConstants = require('../utils/constants/StudentConstants');
const questionConstants = require('../utils/constants/QuestionConstants');
/*const answerConstants = require('../utils/constants/AnswerConstants');
const answerPictureConstants = require('../utils/constants/AnswerPictureConstants');
const questionPictureConstants = require('../utils/constants/QuestionPictureConstants');
const rateConstants = require('../utils/constants/RateConstants');*/

const CREATE_STUDENT_TABLE = `create table ${studentConstants.table_name}(
    ${studentConstants.id} int,
    ${studentConstants.user_name} varchar(20) unique not null,
    ${studentConstants.first_name} varchar(20) not null,
    ${studentConstants.last_name} varchar(20) not null,
    ${studentConstants.password} varchar(200) not null,
    primary key (${studentConstants.id}))`;

const CREATE_QUESTION_TABLE = `create table ${questionConstants.table_name}(
    ${questionConstants.id} int auto_increment,
    ${questionConstants.student_id} int not null,
    ${questionConstants.question} text,
    ${questionConstants.post_date_time} timestamp not null default current_timestamp,
    primary key(${questionConstants.id}),
    foreign key(${questionConstants.student_id}) references ${studentConstants.table_name}(${studentConstants.id})
    )`;

module.exports = {

    buildDatabase: () => {
        db.getConnection().query(CREATE_STUDENT_TABLE, (err) => {
            console.log(err ? err.message : "student table created");
        });

       /* db.getConnection().query(CREATE_QUESTION_TABLE, (err) => {
            console.log(err ? err.message : "question table created");
        });*/
    }

};
