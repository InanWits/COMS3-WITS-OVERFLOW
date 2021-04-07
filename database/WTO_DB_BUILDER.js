const database = require('../utils/services/database');

const studentConstants = require('../utils/constants/StudentConstants');

const CREATE_STUDENT_TABLE = `create table ${studentConstants.table_name}(
    ${studentConstants.id} int,
    ${studentConstants.user_name} varchar(20) unique not null,
    ${studentConstants.first_name} varchar(20) not null,
    ${studentConstants.last_name} varchar(20) not null,
    ${studentConstants.date_of_birth} date not null,
    ${studentConstants.password} varchar(200) not null,
    primary key (${studentConstants.id}))`;

module.exports = {

    createDatabase: () => {

    }

};