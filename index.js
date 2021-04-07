//import dotenv lib
//allows us to read from .env file
const dotenv = require('dotenv');
dotenv.config();

//imported libraries to create server
const http = require('http');
const express = require('express');

//import library for connecting to the database
const database = require('./utils/services/database');
//import the library that builds the database
const databaseBuilder = require('./database/WTO_DB_BUILDER');

database.connectToDatabase().then(
    () => {
        //databaseBuilder.createDatabase();
        console.log('connected to database');
    },
    (err) => { console.log(err.message)}
    );

//setup server
const app = express();

//config server to allow json as request inputs
app.use(express.json())

//create the server
const server = http.createServer(app);
//config server listener
//we use the env variables (process.env.*)
server.listen(parseInt(process.env.PORT), process.env.SERVER_HOST, () => {
    console.log(`server running on http://your_ip_address:${process.env.PORT}/`);
});