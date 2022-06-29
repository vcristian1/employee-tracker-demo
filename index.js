//Required Packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table")

//Connect to a database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // MySQL Password
    password: 'Excel0223!',
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
    console.log(`.---------------------------------------------.`)
    console.log(`|                                             |`)
    console.log(`|                                             |`)
    console.log(`|       ..Employee Tracker Deployed..         |`)
    console.log(`|                                             |`)
    console.log(`|                                             |`)
    console.log(`'---------------------------------------------'`)
    
    addPrompts();
}

//Function for inquirer prompts below
const addPrompts = () => {
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
            return viewEmployees();
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

viewEmployees = () => {
    console.log(`Viewing All Employees!`)
    const sqlQuery = `SELECT * 
    FROM employee;`

    connection.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}

