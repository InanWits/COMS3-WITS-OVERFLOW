const database = require('../utils/services/database');

const studentConstants = require('../utils/constants/StudentConstants');
const questionConstants = require('../utils/constants/QuestionConstants');
const answerConstants = require('../utils/constants/AnswerConstants');



const CREATE_STUDENT_TABLE = `create table ${studentConstants.table_name}(
    ${studentConstants.student_id} int ,
    ${studentConstants.user_name} varchar(20) unique not null,
    ${studentConstants.first_name} varchar(20) not null,
    ${studentConstants.last_name} varchar(20) not null,
    ${studentConstants.email} varchar(30) not null,
    ${studentConstants.date_of_birth} date not null,
    ${studentConstants.password} varchar(200) not null,
    primary key (${studentConstants.id}))`;

module.exports = {

    createDatabase: () => {
        database.getConnection().query(CREATE_STUDENT_TABLE, (err) => {
            console.log(err ? err.message : "student table created");
        });
    }

};