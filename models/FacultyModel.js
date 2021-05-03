const db = require('../utils/services/database');

const facultyConstants = require('../utils/constants/FacultyConstants');

const queryHelper = require('../helpers/QueryHelper');


module.exports = {

    insertFaculty: async (FacultyJsonObject) => {
        /*
        *FacultyJsonObject is a json object in this format
        * {
        *faculty_name : "name of faculty?"
        *}
        * */
        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [facultyConstants.faculty_name];
            const insertFaculty = queryHelper.buildInsertQuery(facultyConstants.table_name, columnsToBeInserted, FacultyJsonObject);

            console.log(insertFaculty);

            db.getConnection().query(insertFaculty, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Faculty entered");
                }
            });
        });
    },

    readAllFaculties: async () => {
        return new Promise((resolve, reject) => {
            const selectAllFaculties = queryHelper.buildSelectQuery(facultyConstants.table_name);
            console.log(selectAllFaculties);

            db.getConnection().query(selectAllFaculties, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            });
        })
    }
}
