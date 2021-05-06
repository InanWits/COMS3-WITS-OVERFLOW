const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const topicModel = require("../../models/TopicModel");

const  topicConstants = require('../../utils/constants/TopicCostants');

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

test("insertTopic_validDataAsInput_topicInserted", () => {
    const topicData = {
        [topicConstants.school_id] : 1,
        [topicConstants.topic] : "Some topic"
    };

    topicModel.insertTopic(topicData).then(
        (topicId) => {
           expect(topicId).toBeGreaterThan(0);
        });
});

test("insertTopic_invalidDataAsInput_topicInsertFailed", () => {
    const topicData = {
        "sid" : 1,
        [topicConstants.topic] : "osomsdf"
    };

    topicModel.insertTopic(topicData).then(
        () => {}, //for success
        (err) => {
            expect(err).not.toBe(null);
        });
});
