const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const answerModel = require("../../models/AnswerModel");

const  answerConstants = require('../../utils/constants/AnswerConstants');

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

test("insertAnswer_validDataAsInput_AnswerInserted", () => {
    const answerData = {
        [answerConstants.student_id] : 1626,
        [answerConstants.question_id] : 1,
        [answerConstants.answer] :"some answer",
        [answerConstants.answer_picture_url] : "wwefghhyjyjugg"
    };

    answerModel.insertAnswer(answerData).then(
        (Answer_id) => {
            expect(Answer_id).toBeGreaterThan(0);
        });
});

test("insertAnswer_invalidDataAsInput_AnswerInsertFailed", () => {
    const answerData = {
        "some error" : 1626,
        [answerConstants.question_id] : 1,
        [answerConstants.answer] :"some answer",
        [answerConstants.answer_picture_url] : "wwefghhyjyjugg"
    };

    answerModel.insertAnswer(answerData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});

test("readAllAnswers_Available", () => {
    answerModel.readAnswers(1).then((result) => {

        expect(result).not.toBe(null);

    })
});
