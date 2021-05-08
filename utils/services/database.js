const  mysql = require('mysql');

let connection;

module.exports = {
    connectToDatabase: async() => {
        return new Promise((resolve, reject) => {
           connection =  mysql.createConnection({
               host: process.env.HOST,
               user: process.env.USER,
               password: process.env.PASSWORD,
               database: process.env.DATABASE
           });

           connection.connect(() => {
               /*if (err){
                   console.log(err.message);
                   reject();
               }
               else{
                   resolve();
               }*/
               resolve()
           });
        });
    },

    getConnection: () => {
        return connection;
    }
};