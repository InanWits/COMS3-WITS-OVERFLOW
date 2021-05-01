const db = require('../utils/services/database');

const studentConstants = require('../utils/constants/StudentConstants');

const queryHelper = require('../helpers/QueryHelper');
const bcrypt = require('bcrypt');

module.exports = {

    insertStudent: async (StudentJsonObject) => {
        /*
        * StudentJsonObject is a json object in this format
        * {
        *   student_id : "1234567",
        *   user_name : "ChrisBrown",
        *   first_name : "Sesona",
        *   last_name : "Maraxaba",
        *   email : "1636376@students.wits.ac.za",
        *   date_of_birth : "20003-06-20",
        *   password : "password"
        *}
        * */

        return new Promise((resolve, reject) => {
            //const hash_pass = studentConstants.password;

            const saltRounds = 10;
            const  password = StudentJsonObject[studentConstants.password];
            const  salt = bcrypt.genSaltSync(saltRounds);
            StudentJsonObject[studentConstants.password] = bcrypt.hashSync(password, salt);

            const columnsToBeInserted = [studentConstants.student_id, studentConstants.user_name,studentConstants.first_name, studentConstants.last_name,
                                        studentConstants.email,studentConstants.date_of_birth,studentConstants.password];

            const insertStudent = queryHelper.buildInsertQuery(studentConstants.table_name, columnsToBeInserted,StudentJsonObject);

            console.log(insertStudent);

            db.getConnection().query(insertStudent, (err) => {
                if (err){
                    reject(err.message);
                }else{
                    resolve("Student successfully registered");
                }
            });
        });
    },

    getAllStudents: async () => {
        return new Promise((resolve, reject) => {
            const getAllStudents = queryHelper.buildSelectQuery(studentConstants.table_name);

            const columnsToGet = [studentConstants.student_id, studentConstants.first_name, studentConstants.last_name];
            const getAllStudentsFL = queryHelper.buildSelectQuery(studentConstants.table_name, columnsToGet);

            console.log(getAllStudents);
            console.log(getAllStudentsFL);


            db.getConnection().query(getAllStudentsFL, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            });
        });
    },

    loginStudent: async (StudentJsonObject) => {
        return new Promise((resolve, reject) => {
            const whereConditions = {
                //added student id to the json object
                [studentConstants.user_name] : StudentJsonObject[studentConstants.user_name]
            };

            const getStudent = queryHelper.buildSelectQuery(studentConstants.table_name,
                [studentConstants.student_id, studentConstants.password], whereConditions);

            console.log(getStudent);

            db.getConnection().query(getStudent, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    if (result.length === 0) {
                       reject("Authorization failed due to bad credentials")
                    } else {
                        const plainPassword = StudentJsonObject[studentConstants.password];
                        const studentObj = result[0];
                        const hashedPassword = studentObj[studentConstants.password];
                        bcrypt.compare(plainPassword,hashedPassword, (err, result) =>{
                            if (result) {
                                resolve(result[0][studentConstants.student_id]);
                            }

                            else{
                                reject("Authorization failed due to bad credentials");
                            }
                        });

                    }
                }
            });
        });
    }

};