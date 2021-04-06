//import dotenv lib
//allows us to read from .env file
const dotenv = require('dotenv');
dotenv.config();

//imported libraries to create server
const http = require('http');
const express = require('express');

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