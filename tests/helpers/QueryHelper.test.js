const queryHelper = require('../../helpers/QueryHelper');
const {test} = require("@jest/globals");

test('queryHelper_buildSelectQuery_buildsCorrectQuery', () => {
    const selectQuery = queryHelper.buildSelectQuery('CLIENT');
    expect(selectQuery).toBe("select * from CLIENT");
});