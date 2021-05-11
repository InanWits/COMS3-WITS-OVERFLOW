const dotenv = require('dotenv');
const {afterAll, beforeAll, test} = require("@jest/globals");

const database = require("../../utils/services/database");

const facultyModel = require("../../models/FacultyModel");

beforeAll(async (done) => {
    dotenv.config();
    database.connectToDatabase().then(() => { done(); },
        () => { done(); });
});

afterAll(async () => {
    await database.getConnection().end();
});

test("test_read_faculties", () => {
    facultyModel.readAllFaculties().then((result) => {
        expect(result).not.toBe(null);
        expect(result.size()).toBeGreaterThan()
    })
});

