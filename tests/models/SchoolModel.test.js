const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const schoolModel = require("../../models/SchoolModel");

beforeAll(async (done) => {
    dotenv.config();
    database.connectToDatabase().then(() => { done(); },
        () => { done(); });
});

afterAll(async () => {
    await database.getConnection().end();
});

test("test_read_school", () => {
    schoolModel.readSchools(2).then((result) => {
        expect(result).not.toBe(null);
    })
});


/*

afterAll(async () => {
    await database.getConnection().end();
});*/

