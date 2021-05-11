const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const studentModel = require("../../models/StudentModel");

const  studentConstants = require('../../utils/constants/StudentConstants');

const databaseBuilder = require("../../database/WTO_DB_BUILDER");

beforeAll(async (done) => {
    dotenv.config();
    database.connectToDatabase().then(
        () => {
            databaseBuilder.createDatabase();
            const studentData = {
                [studentConstants.student_id] : 1234,
                [studentConstants.user_name] : "surp10",
                [studentConstants.first_name] :"surp",
                [studentConstants.last_name] :"lastname",
                [studentConstants.email] :"sesona@gmail.com",
                [studentConstants.date_of_birth] :"2000-06-21",
                [studentConstants.password] :"123456"
            };

            studentModel.insertStudent(studentData).then(
                (user_name) => {
                    expect(user_name).not.toBe(null);
                });

            done();
        },
        () => { done(); });
});

afterAll(async () => {
    await database.getConnection().end();
});

test("insertStudent_validDataAsInput_StudentInserted", () => {
    const studentData = {
        [studentConstants.student_id] : 1626,
        [studentConstants.user_name] : "sesona08",
        [studentConstants.first_name] :"sesona",
        [studentConstants.last_name] :"lastname",
        [studentConstants.email] :"sesona@gmail.com",
        [studentConstants.date_of_birth] :"2000-06-21",
        [studentConstants.password] :"1234567"
    };

    studentModel.insertStudent(studentData).then(
        (user_name) => {
            expect(user_name).not.toBe(null);
        });
});

test("insertStudent_invalidDataAsInput_StudentInsertFailed", () => {
    const studentData = {
        [studentConstants.student_id] : 1626,
         'sid' : "sesona08",
        [studentConstants.first_name] :"sesona",
        [studentConstants.last_name] :"lastname",
        [studentConstants.email] :"sesona@gmail.com",
        [studentConstants.date_of_birth] :"2000-06-21",
        [studentConstants.password] :"1234567"
    };

    studentModel.insertStudent(studentData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});

test("loginStudent_validDataAsInput_StudentLoggedIn", () => {

    const loginData = {

        [studentConstants.user_name] : "surp10",
        [studentConstants.password] :"123456"
    };

    studentModel.loginStudent(loginData).then(
        (user_name) => {
            expect(user_name).not.toBe(null);
        });
});

test("loginStudent_InvalidDataAsInput_StudentNotLoggedIn", () => {

    const loginData = {

        [studentConstants.user_name] : "surp10",
        [studentConstants.password] :"12345667"
    };

    studentModel.loginStudent(loginData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});