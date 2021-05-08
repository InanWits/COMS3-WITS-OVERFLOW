const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const QuestionModel = require("../../models/QuestionModel");

const  questionConstants = require('../../utils/constants/QuestionConstants');

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

test("insertQuestion_validDataAsInput_questionInserted", () => {
    const questionData = {
        [questionConstants.student_id] : 16263445,
        [questionConstants.topic_id] : 1,
        [questionConstants.question] :"some question",
        [questionConstants.question_picture_url] : "wwefghhyjyjugg"
    };

    QuestionModel.insertQuestion(questionData).then(
        (Question_id) => {
            expect(Question_id).toBeGreaterThan(0);
        });
});

test("insertQuestion_invalidDataAsInput_QuestionInsertFailed", () => {
    const questionData = {
        "something" : 1626,
        [questionConstants.topic_id] : 1,
        [questionConstants.question] :"some question",
        [questionConstants.question_picture_url] : "wwefghhyjyjugg",
    };

    QuestionModel.insertQuestion(questionData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});