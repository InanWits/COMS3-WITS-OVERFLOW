const dummyHelper = require('../../helpers/DummyHelper');
const {test} = require("@jest/globals");

test('runs a dummy test', () => {
   expect(dummyHelper.add(10, 10)).toBe(20);
});