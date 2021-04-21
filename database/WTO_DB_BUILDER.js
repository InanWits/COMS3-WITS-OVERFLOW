const database = require('../utils/services/database');

const studentConstants = require('../utils/constants/StudentConstants');
const questionConstants = require('../utils/constants/QuestionConstants');
const answerConstants = require('../utils/constants/AnswerConstants');
const topicConstants = require('../utils/constants/TopicCostants');
const questionPictureConstants = require('../utils/constants/QuestionPictureConstants');
const answerPictureConstants = require('../utils/constants/AnswerPictureConstants');

const CREATE_STUDENT_TABLE = `create table ${studentConstants.table_name}(
    ${studentConstants.student_id} int ,
    ${studentConstants.user_name} varchar(20) unique not null,
    ${studentConstants.first_name} varchar(20) not null,
    ${studentConstants.last_name} varchar(20) not null,
    ${studentConstants.email} varchar(30) not null,
    ${studentConstants.date_of_birth} date not null,
    ${studentConstants.password} varchar(200) not null,
    primary key (${studentConstants.student_id}))`;

const CREATE_QUESTION_TABLE = `create table ${questionConstants.table_name}(
    ${questionConstants.question_id} int auto_increment,
    ${questionConstants.student_id} int not null,
    ${questionConstants.question} text,
    ${questionConstants.post_date_time} timestamp not null default current_timestamp,
    primary key (${questionConstants.question_id}),
    foreign key (${questionConstants.student_id}) references ${studentConstants.table_name}(${studentConstants.student_id}))`;

const CREATE_ANSWER_TABLE = `create table ${answerConstants.table_name}(
    ${answerConstants.answer_id} int auto_increment,
    ${answerConstants.question_id} int not null,
    ${answerConstants.student_id} int not null,
    ${answerConstants.answer} text,
    ${answerConstants.post_date_time} timestamp not null default current_timestamp,
    primary key(${answerConstants.answer_id}),
    foreign key(${answerConstants.question_id}) references ${questionConstants.table_name}(${questionConstants.question_id}),
    foreign key(${answerConstants.student_id}) references ${studentConstants.table_name}(${studentConstants.student_id}))`;

const CREATE_TOPIC_TABLE = `create table ${topicConstants.table_name}(
    ${topicConstants.topic_id} int auto_increment,
    ${topicConstants.question_id} int not null,
    ${topicConstants.answer_id} int not null,
    ${topicConstants.topic} text,
    primary key(${topicConstants.topic_id}),
    foreign key(${topicConstants.question_id}) references ${questionConstants.table_name}(${questionConstants.question_id}),
    foreign key(${topicConstants.answer_id}) references ${answerConstants.table_name}(${answerConstants.answer_id}))`;


const CREATE_QUESTION_PICTURE_TABLE = `create table ${questionPictureConstants.table_name}(
    ${questionPictureConstants.question_picture_id} int auto_increment,
    ${questionPictureConstants.question_id} int not null,
    ${questionPictureConstants.question_picture_url} text,
    primary key (${questionPictureConstants.question_picture_id}),
    foreign key (${questionPictureConstants.question_id}) references ${questionConstants.table_name}(${questionConstants.question_id}))`;

const CREATE_ANSWER_PICTURE_TABLE = `create table ${answerPictureConstants.table_name}(
    ${answerPictureConstants.answer_picture_id} int auto_increment,
    ${answerPictureConstants.answer_id} int not null,
    ${answerPictureConstants.answer_picture_url} text,
    primary key (${answerPictureConstants.answer_picture_id}),
    foreign key (${answerPictureConstants.answer_id}) references ${answerConstants.table_name}(${answerConstants.answer_id}))`;

module.exports = {

    createDatabase: () => {
        database.getConnection().query(CREATE_STUDENT_TABLE, (err) => {
            console.log(err ? err.message : "student table created");
        });

        database.getConnection().query(CREATE_QUESTION_TABLE, (err) => {
            console.log(err ? err.message : "question table created");
        });

        database.getConnection().query(CREATE_ANSWER_TABLE, (err) => {
            console.log(err ? err.message : "answer table created");
        });
        database.getConnection().query(CREATE_TOPIC_TABLE, (err) =>{
         console.log(err ? err.message : "topic table created");
        });

        database.getConnection().query(CREATE_QUESTION_PICTURE_TABLE, (err) =>{
           console.log(err ? err.message : "question  picture table created");
        });

        database.getConnection().query(CREATE_ANSWER_PICTURE_TABLE, (err) =>{
            console.log(err ? err.message : "answer picture table created");
        });
    }

};