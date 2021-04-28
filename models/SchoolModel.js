const db = require('../utils/services/database');

const schoolConstants = require('../utils/constants/SchoolConstants');

const queryHelper = require('../helpers/QueryHelper');


module.exports = {

    insertSchool: async (SchoolJsonObject) => {
        /*
        *SchoolJsonObject is a json object in this format
        * {
        *school_name : "name of school?"
        * faculty_id : "faculty id"
        *}
        * */
        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [schoolConstants.school_name, schoolConstants.faculty_id];
            const insertSchool = queryHelper.buildInsertQuery(schoolConstants.table_name, columnsToBeInserted, SchoolJsonObject);

            console.log(insertSchool);

            db.getConnection().query(insertSchool, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("School entered");
                }
            });
        });
    }
}