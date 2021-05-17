const queryHelper = require('../../helpers/QueryHelper');
const {test} = require("@jest/globals");

test('queryHelper_buildSelectQuery_buildsCorrectQuery', () => {
    const selectQuery = queryHelper.buildSelectQuery('CLIENT');
    expect(selectQuery).toBe("select * from CLIENT");
});

test('queryHelper_buildInsertQuery_returnsNull', () => {
    const insertQuery = queryHelper.buildInsertQuery('a', ['b'], {});
    expect(insertQuery).toBe(null);
});

test('queryHelper_buildInsertQueryWithValues_returnsNull', () => {
   const insertQueryWithValues = queryHelper.buildInsertQueryWithValues('a', ['b', 'c'], []);
   expect(insertQueryWithValues).toBe(null);
});

test('queryHelper_buildInsertQueryWithValues_buildsCorrectQuery', () => {
   const insertQueryWithValues =  queryHelper.buildInsertQueryWithValues('a', ['b'], ['c']);
   expect(insertQueryWithValues).toBe("insert into a (b) values ('c')");
});

test('queryHelper_buildInsertQueryWithListOfValues_returnsNull', () => {
    const insertQueryWithValues = queryHelper.buildInsertQueryWithListOfValues('a', ['a'], [['a', 'b']]);
    expect(insertQueryWithValues).toBe(null);
});

test('queryHelper_buildInsertQueryWithListOfValues_buildsCorrectQuery', () => {
    const insertQueryWithValues = queryHelper.buildInsertQueryWithListOfValues('a', ['a', 'b'], [['a', 'b']]);
    expect(insertQueryWithValues).toBe("insert into a (a,b) values ('a','b')");
});

test('queryHelper_buildDeleteQuery_buildsCorrectQuery', () => {
   const deleteQuery = queryHelper.buildDeleteQuery('a', null);
   expect(deleteQuery).toBe("delete from a");
});

test('queryHelper_extractValuesByColumns_buildsCorrectQuery', () => {
   const extractValues = queryHelper.extractValuesByColumns({a: "a"}, ['a']);
   expect(extractValues[0]).toBe('a');
});

test('queryHelper_buildUpdateQuery_buildsCorrectQuery', () => {
    const updateQuery = queryHelper.buildUpdateQuery('a', ['b'], ['c'], null);
    expect(updateQuery).toBe("update a set b = 'c'");
});

test('queryHelper_buildAssociatedInnerJoin_returnsNull', () => {
   const innerJoinQuery = queryHelper.buildAssociatedInnerJoin(['a'], ['b', 'c'], [], false, []);
   expect(innerJoinQuery).toBe(null);
});

test('queryHelper_buildAssociatedInnerJoin_buildsCorrectNeighbour', () => {
   const innerJoinQuery = queryHelper.buildAssociatedInnerJoin(['a', 'b'], ['c', 'c'],
       [
           ['d', 'd'],
           ['e', 'e']
       ], true);
   expect(innerJoinQuery).toBe("select a.d,a.d,b.e,b.e from (a inner join b on a.c = b.c)");
});

test('queryHelper_buildAssociatedInnerJoin_buildsCorrectNonNeighbour', () => {
    const innerJoinQuery = queryHelper.buildAssociatedInnerJoin(['a', 'b'], ['c', 'c'],
        [
            ['d', 'd'],
            ['e', 'e']
        ], false,
        ['f']);
    expect(innerJoinQuery).toBe("select a.d,a.d,b.e,b.e from (a inner join b on a.f = b.c)");
});
