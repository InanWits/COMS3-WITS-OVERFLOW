const db = require('../utils/services/database');

const  rateConstants = require('../utils/constants/RateConstants');

const queryHelper = require('../helpers/QueryHelper');

module.exports = {
    /*
     * RateJsonObject is a json object in this format
     * {
     *   student_id : "1918469"
     *   answer_id : "123456",
     *   Rate : "rate ?"
     *}
     * */
    /*
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
    }, */
    vote: async (data) =>{
        return new Promise((resolve, reject) => {

            const whereCondition = {
                [rateConstants.student_id] : data[rateConstants.student_id],
                [rateConstants.answer_id] : data[rateConstants.answer_id]
            };

            const SelectQuery = queryHelper.buildSelectQuery(rateConstants.table_name,[rateConstants.student_id,rateConstants.answer_id,
                rateConstants.rate], whereCondition);

            console.log(SelectQuery);
            db.getConnection().query(SelectQuery,(err,result) => {
                if (err){
                    reject(err.message);
                }
                else {
                    if(result.length === 0){
                        const insertQuery = queryHelper.buildInsertQuery(rateConstants.table_name,[rateConstants.student_id,rateConstants.answer_id,rateConstants.rate],data);
                        db.getConnection().query(insertQuery, (err,result) => {
                            if (err){
                                reject(err.message);
                            }
                            else{
                                resolve("Answer voted successfully!");
                            }
                        });
                    }
                    else{
                        const updateRateQuery = queryHelper.buildUpdateQuery(rateConstants.table_name,[rateConstants.rate],[data[rateConstants.rate]],whereCondition);
                        db.getConnection().query(updateRateQuery, (err, result) => {
                            if (err){
                                reject(err.message);
                            }
                            else{
                                resolve("Answer vote updated successfully");
                            }
                        });
                    }
                }
            });
        });
    }
}