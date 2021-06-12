const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const rateModel = require("../../models/RateModel");

const rateConstant = require("../../utils/constants/RateConstants");

beforeAll(async (done) => {
    dotenv.config();
    database.connectToDatabase().then(() => { done(); },
        () => { done(); });
});

afterAll(async () => {
    await database.getConnection().end();
});

test("test_insert_rate", () => {
    const rateData = {
        [rateConstant.student_id] : 1234,
        [rateConstant.answer_id] : 1,
        [rateConstant.rate] : 0,
    };

    rateModel.vote(rateData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});
