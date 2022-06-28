//Required Packages
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
    welcome();
});

function welcome () {
    console.log(`Employee Tracker Deploying...`)
    addPrompts();
}

//Function for inquirer prompts below
function addPrompts () {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "Add an Employee",
            "Update an Employee Role",
            "View all Roles",
            "Add a Role",
            "View all Departments",
            "Add a Department",
            "Quit"
        ]
    })
    .then((answer) => {
        //Destructures choices 
        const { choices } = answer
        if (choices === "View all Employees") {
            viewEmployees();
        }
        if (choices === "Add an Employee") {
            addEmployee();
        }
        if (choices === "Update an Employee Role") {
            updateEmployeeRole();
        }
        if (choices === "View all Roles") {
            viewRoles();
        }
        if (choices === "Add a Role") {
            addRole();
        }
        if (choices === "View all Departments") {
            viewDepartments();
        }
        if (choices === "Add a Department") {
            addDepartment();
        }
        if (choices === "Quit") {
            connection.end();
        };
    })
}

function viewEmployees () {
    const sqlQuery = `SELECT *
    FROM employee;`;
    connection.query(sqlQuery, (err, res) => {
        if (err) throw err;

        console.log("|")
        console.log(res)
        console.log("|")
        //Takes the user back to the initial prompt as they have viewed all employees at this
        addPrompts();

    })
}

//GET/POST/DELETE Routes

//Listen on PORT 
app.listen(PORT, () => {console.log(`Serving running on PORT ${PORT}`)});
