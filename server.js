//Packages
const express = require("express");
const mysql2 = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
//Initialize our app saving it to the express method.
const app = express();

//Express Middleware handles data parsing
app.use(express.urlencoded ({extended: false}));
app.use(express.json());

//Connect to a database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // MySQL Password
    password: '',
    //Database
    database: 'company_db'
});

connection.connect(function(err){
    // connected! unless `err` is set if so throw err
    if (err) throw err;
    //start is the function which will begin to run the inquirer prompts beginning with
    //the list "what would you like to do?""
    start();
});

//GET/POST/DELETE Routes

//Listen on PORT 
app.listen(PORT, () => {console.log(`Serving running on PORT ${PORT}`)});
