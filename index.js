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
        console.log(`.---------------------------------------------.`)
        console.log(`|          ...Viewing Employees...            |`)
        console.log(`|                                             |`)
        console.log(`'---------------------------------------------'`)
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
        console.log(`.---------------------------------------------.`)
        console.log(`|            ...Viewing Roles...              |`)
        console.log(`|                                             |`)
        console.log(`'---------------------------------------------'`)
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
        console.log(`.---------------------------------------------.`)
        console.log(`|          ...Viewing Departments...          |`)
        console.log(`|                                             |`)
        console.log(`'---------------------------------------------'`)
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}

addDepartment = () => {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the Department's name?",
        }
    ])
    .then((answer) => {
    const sqlQuery = `INSERT INTO department (name) VALUES (?)`
    connection.query(sqlQuery, answer.department, function (err, results) {
        if (err) throw err;
        
    });
    viewDepartments();
    addPrompts();
    })
}

//Not finished
addEmployee = () => {
    //Selects the role.title, role.salary, and role.department_id from the role table.
    const sqlQuery = `Select * from role`
    connection.query(sqlQuery, function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the Employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the Employee's last name?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the Employee's manager ID?"
            },
            // {
            //     name: "role_id",
            //     type: "list",
            //     message: "What is the Employee's role?",
            //     choices: function getRoles () {
            //                     let roleChoices = []
            //                         results.forEach(results => {
            //                             roleChoices.push(
            //                                 results.title
            //                             );
            //                         })
            //                     return roleChoices;
            //                 }
            // },
            {
                name: "role_id",
                type: "input",
                message: "What is the Employee's role ID?"
            },
        ])
        .then((answer) => { 
        console.log(answer)
        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        const values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
        connection.query(sqlQuery, values, function (err, results) {
            if (err) throw err;
            console.log()
                        
        });
        viewEmployees();
        addPrompts();
        })
    });
}
