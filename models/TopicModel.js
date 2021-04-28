const db = require('../utils/services/database');

const  topicConstants = require('../utils/constants/TopicCostants');

const queryHelper = require('../helpers/QueryHelper');

module.exports = {
    /*
     * TopicJsonObject is a json object in this format
     * {
     *    school_id : "1",
     *   topic : "topic?"
     *}
     * */
    insertTopic: async (TopicJsonObject) => {

        return new Promise((resolve, reject) => {

            const columnsToBeInserted = [topicConstants.school_id, topicConstants.topic];

            const insertTopic = queryHelper.buildInsertQuery(topicConstants.table_name, columnsToBeInserted, TopicJsonObject);

            console.log(insertTopic);

            db.getConnection().query(insertTopic, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Topic posted!");
                }
            });
        });
    }
}