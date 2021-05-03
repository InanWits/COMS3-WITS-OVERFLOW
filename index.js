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
//import path, we use this to make some directories public
const path = require('path');

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
app.use(express.json());
//make the public folder have public access
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//redirect server to index page when user opens server ip address on webpage
app.get('/', (req, res) => {
   res.sendFile('public/index.html', {
      root: path.join(__dirname, './')
   });
});

//importing all controllers.
const StudentController = require('./controllers/StudentController');
const AnswerController = require('./controllers/AnswerController');
const QuestionController = require('./controllers/QuestionController');
const RateController = require('./controllers/RateController');
const TopicController = require('./controllers/TopicController');
const FacultyController = require('./controllers/FacultyController');
const SchoolController = require('./controllers/SchoolController');


//bind routers to controllers.
app.use('/Students', StudentController);
app.use('/Questions', QuestionController);
app.use('/Answers', AnswerController);
app.use('/Rates', RateController);
app.use('/Topics', TopicController);
app.use('/Faculties', FacultyController);
app.use('/Schools', SchoolController);

//create the server
const server = http.createServer(app);
//config server listener
//we use the env variables (process.env.*)
server.listen(parseInt(process.env.PORT), process.env.SERVER_HOST, () => {
    console.log(`server running on http://your_ip_address:${process.env.PORT}/`);
});
