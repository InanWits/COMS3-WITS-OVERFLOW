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
        //[studentConstants.user_name] : "sesona08",
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