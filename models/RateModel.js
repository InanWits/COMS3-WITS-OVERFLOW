const db = require('../utils/services/database');

const  rateConstants = require('../utils/constants/RateConstants');

const queryHelper = require('../helpers/QueryHelper');

module.exports = {
    /*
     * RateJsonObject is a json object in this format
     * {
     *    student_id : "1918469"
     *   answer_id : "123456",
     *   Rate : "rate ?"
     *}
     * */
    insertRate: async (RateJsonObject) => {

        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [ rateConstants.student_id, rateConstants.answer_id, rateConstants.rate];

            const insertRate = queryHelper.buildInsertQuery(rateConstants.table_name, columnsToBeInserted, RateJsonObject);

            console.log(insertRate);

            db.getConnection().query(insertRate, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Answer rated!");
                }
            });
        });
    }
}