const database = require('../utils/services/database');

const studentConstants = require('../utils/constants/StudentConstants');
const questionConstants = require('../utils/constants/QuestionConstants');
const answerConstants = require('../utils/constants/AnswerConstants');
const topicConstants = require('../utils/constants/TopicCostants');
const rateConstants = require('../utils/constants/RateConstants');
const schoolConstants = require('../utils/constants/SchoolConstants');
const  facultyConstants = require('../utils/constants/FacultyConstants');

const CREATE_STUDENT_TABLE = `create table ${studentConstants.table_name}(
    ${studentConstants.student_id} int ,
    ${studentConstants.user_name} varchar(20) unique not null,
    ${studentConstants.first_name} varchar(20) not null,
    ${studentConstants.last_name} varchar(20) not null,
    ${studentConstants.email} varchar(30) unique not null,
    ${studentConstants.date_of_birth} date not null,
    ${studentConstants.password} varchar(200) not null,
    primary key (${studentConstants.student_id}))`;

const CREATE_FACULTY_TABLE = `create table ${facultyConstants.table_name}(
    ${facultyConstants.faculty_id} int auto_increment,
    ${facultyConstants.faculty_name} varchar(50) unique not null,
    primary key (${facultyConstants.faculty_id}))`;

const CREATE_SCHOOL_TABLE =`create table ${schoolConstants.table_name}(
    ${schoolConstants.school_id} int auto_increment,
    ${schoolConstants.school_name} varchar(70) unique not null,
    ${schoolConstants.faculty_id} int not null,
    primary key (${schoolConstants.school_id}),
    foreign key (${schoolConstants.faculty_id}) references ${facultyConstants.table_name} (${facultyConstants.faculty_id}))`;

const CREATE_TOPIC_TABLE = `create table ${topicConstants.table_name}(
    ${topicConstants.topic_id} int auto_increment,
    ${topicConstants.school_id} int not null,
    ${topicConstants.topic} text not null,
    primary key(${topicConstants.topic_id}),
    foreign key (${topicConstants.school_id}) references ${schoolConstants.table_name} (${schoolConstants.school_id}))`;

const CREATE_QUESTION_TABLE = `create table ${questionConstants.table_name}(
    ${questionConstants.question_id} int auto_increment,
    ${questionConstants.student_id} int not null,
    ${questionConstants.topic_id} int not null,
    ${questionConstants.question} text not null,
    ${questionConstants.question_picture_url} text,
    ${questionConstants.post_date_time} timestamp not null default current_timestamp,
    primary key (${questionConstants.question_id}),
    foreign key (${questionConstants.student_id}) references ${studentConstants.table_name}(${studentConstants.student_id}),   
    foreign key (${questionConstants.topic_id}) references ${topicConstants.table_name}(${topicConstants.topic_id}))`;


const CREATE_ANSWER_TABLE = `create table ${answerConstants.table_name}(
    ${answerConstants.answer_id} int auto_increment,
    ${answerConstants.question_id} int not null,
    ${answerConstants.student_id} int not null,
    ${answerConstants.answer} text not null,
    ${answerConstants.answer_picture_url} text,
    ${answerConstants.post_date_time} timestamp not null default current_timestamp,
    primary key(${answerConstants.answer_id}),
    foreign key(${answerConstants.question_id}) references ${questionConstants.table_name}(${questionConstants.question_id}),
    foreign key(${answerConstants.student_id}) references ${studentConstants.table_name}(${studentConstants.student_id}))`;


const CREATE_RATE_TABLE  = `create table ${rateConstants.table_name}(
    ${rateConstants.rate_id} int auto_increment,
    ${rateConstants.student_id} int not null,
    ${rateConstants.answer_id} int not null,
    ${rateConstants.rate} int not null,
    primary key (${rateConstants.rate_id}),
    foreign key (${rateConstants.answer_id}) references ${answerConstants.table_name} (${answerConstants.answer_id}),
    foreign key (${rateConstants.student_id}) references ${studentConstants.table_name} (${studentConstants.student_id}))`;

const INSERT_FACULTIES = `insert into ${facultyConstants.table_name}(${facultyConstants.faculty_name}) values ('Commerce,Law and Management'), ('Engineering'),
    ('Humanities'), ('Science')`;

const INSERT_SCHOOLS = `insert into ${schoolConstants.table_name}(${schoolConstants.school_name}, ${schoolConstants.faculty_id}) values ('Computer Science',4), ('Mathematics',4), 
    ('Applied Mathematics',4), ('Accounting',1), ('Law',1), ('Economics',1), 
    ('Civil Engineering',2),('Mechanical Engineering',2),('Electrical Engineering',2),('Film and Television',3), ('Education',3),('Fine Arts',3)`;
module.exports = {

    createDatabase: () => {
        database.getConnection().query(CREATE_STUDENT_TABLE, (err) => {
            console.log(err ? err.message : "student table created");
        });


        database.getConnection().query(CREATE_FACULTY_TABLE, (err) => {
            console.log(err ? err.message : "faculty table created");
        });

        //pre-populated faculties on the faculty table
        //sql: "INSERT into faculty(faculty_name)values('Commerce,Law and Management')"
        database.getConnection().query(INSERT_FACULTIES, (err) => {
            console.log(err ? err.message : "faculties inserted");
        });


        database.getConnection().query(CREATE_SCHOOL_TABLE, (err) =>{
            console.log(err ? err.message : "school table created");
        });

        //pre-populated school table
        database.getConnection().query(INSERT_SCHOOLS, (err) => {
            console.log(err ? err.message : "schools inserted");
        });

        database.getConnection().query(CREATE_TOPIC_TABLE, (err) =>{
            console.log(err ? err.message : "topic table created");
        });

        database.getConnection().query(CREATE_QUESTION_TABLE, (err) => {
            console.log(err ? err.message : "question table created");
        });

        database.getConnection().query(CREATE_ANSWER_TABLE, (err) => {
            console.log(err ? err.message : "answer table created");
        })

        database.getConnection().query(CREATE_RATE_TABLE, (err) =>{
            console.log(err ? err.message : "rate table created")
        });


    }

};
