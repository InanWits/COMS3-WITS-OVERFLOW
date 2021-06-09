const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const rateModel = require("../../models/RateModel");

const  rateConstants = require('../../utils/constants/RateConstants');

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

test("UpVoteDownVoteAnswer_validDataAsInput_votedSuccessfully", () => {
    const voteData = {
        [rateConstants.student_id] : 1234,
        [rateConstants.answer_id] : 1,
        [rateConstants.rate] : 1
    };

    rateModel.vote(voteData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});

test("UpVoteDownVoteAnswer_InvalidDataAsInput_votedSuccessfully", () => {
    const voteData = {
        [rateConstants.student_id] : 1234,
        "some id": 1,
        [rateConstants.rate] : 1
    };

    rateModel.vote(voteData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});

test("UpdateVotedAnswer_validDataAsInput_updatedSuccessfully", () => {
    const voteData = {
        [rateConstants.student_id] : 123,
        [rateConstants.answer_id] : 1,
        [rateConstants.rate] : 0
    };

    rateModel.vote(voteData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});