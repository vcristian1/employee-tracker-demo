//Required Packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table")

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
    inquirer.prompt([
        {
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
        }
    ])
    .then((answer) => {
 
        if (answer.action === "View all Employees") {
            viewEmployees();
        }
        if (answer.action === "Add an Employee") {
            addEmployee();
        }
        if (answer.action === "Update an Employee Role") {
            updateEmployeeRole();
        }
        if (answer.action === "View all Roles") {
            viewRoles();
        }
        if (answer.action === "Add a Role") {
            addRole();
        }
        if (answer.action === "View all Departments") {
            viewDepartments();
        }
        if (answer.action === "Add a Department") {
            addDepartment();
        }
        if (answer.action === "Quit") {
            connection.end();
        };
        
    })
}

viewEmployees = () => {
    const sqlQuery = `SELECT * 
    FROM employee;`

    connection.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")
        console.log(`Viewing All Employees!`)
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}

viewRoles = () => {
    const sqlQuery = `SELECT * 
    FROM role;`

    connection.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")
        console.log(`Viewing All Roles!`)
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}

viewDepartments = () => {
    const sqlQuery = `SELECT * 
    FROM department;`

    connection.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")
        console.log(`Viewing All Departments!`)
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}

addEmployee = () => {
    const sqlQuery = `SELECT * from role`
    connection.query(sqlQuery, function (err, results) {
        if (err) throw err;
        inquirer.prompt([
        {
            name: "role_id",
            type: "list",
            message: "What is the employees's role?",
            choices: getRoles = () => {
                let roleChoices = []
                    results.forEach(results => {
                        roleChoices.push(
                            results.title
                        );
                    })
                return roleChoices;
            }
        }
        ])
    });
    console.log(`Adding an Employee!`)
}
