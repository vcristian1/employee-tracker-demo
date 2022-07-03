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
    if (err) throw err;
    //If no errors and you succesfully connect, the console logs a message to the user confirming they have deployed the employee tracker.
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
    //function which runs the intial list prompt asking the user what they would like to do.
    addPrompts();
}

//Function for inquirer prompts below
const addPrompts = () => {
    inquirer.prompt([
        {
            //Named action as this list prompt has choices which run specific functions.
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
        //if an answer choice has been selected by the user, and the string of the choice selected is equivalent to "View All Employees", 
        //then viewEmployees() runs.
        if (answer.action === "View all Employees") {
            viewEmployees();
        }
        //if an answer choice has been selected by the user, and the string of the choice selected is equivalent to "Add an Employee", 
        //then addEmployee() runs.
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
    // variable sqlQuery is set equal to a string of text which is a query which selects everything from the employee table in company_db using mysql syntax.
    const sqlQuery = `SELECT * 
    FROM employee;`

    //then we send the sqlQuery variable (which holds a query) to the company_db, if successful the console will render the data in 
    //the employee table using console.table, and logs a message to the user confiming.
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

viewNewAddedEmployee = () => {
    // variable sqlQuery is set equal to a string of text which is a query which selects everything from the employee table in company_db using mysql syntax.
    const sqlQuery = `SELECT * 
    FROM employee;`

    //then we send the sqlQuery variable (which holds a query) to the company_db, if successful the console will render the data in 
    //the employee table using console.table, and logs a message to the user confiming.
    connection.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log(`.---------------------------------------------.`)
        console.log(`|          ...Added New Employee...           |`)
        console.log(`|                                             |`)
        console.log(`'---------------------------------------------'`)
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}

viewRoles = () => {
    // variable sqlQuery is set equal to a string of text which is a query which selects everything from the role table in company_db using mysql syntax.
    const sqlQuery = `SELECT * 
    FROM role;`
    //then we send the sqlQuery variable (which holds a query) to the company_db, if successful the console will render the data in 
    //the role table in the database company_db using console.table, and logs a message to the user confirming.
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
    // variable sqlQuery is set equal to a string of text which is a query which selects everything from the department table in company_db using mysql syntax.
    const sqlQuery = `SELECT * 
    FROM department;`
    //then we send the sqlQuery variable (which holds a query) to the company_db, if successful the console will render the data in 
    //the department table in the database company_db using console.table, and logs a message to the user confirming.
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

viewNewAddedDepartment = () => {
    // variable sqlQuery is set equal to a string of text which is a query which selects everything from the department table in company_db using mysql syntax.
    const sqlQuery = `SELECT * 
    FROM department;`

    //then we send the sqlQuery variable (which holds a query) to the company_db. If successful the console will render the data from 
    //the department table in the database company_db using console.table, and logs a message to the user confirming a new Department is added.
    connection.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log(`.---------------------------------------------.`)
        console.log(`|          ...Added New Department...         |`)
        console.log(`|                                             |`)
        console.log(`'---------------------------------------------'`)
        //Takes the user back to the initial prompt as they have viewed all employees at
        addPrompts();

    });
}
//Adds a new department to the department table in company_db
addDepartment = () => {
    inquirer.prompt([
        {
            //prompts the user to input the name of the department they wish to add
            name: "department",
            type: "input",
            message: "What is the Department's name?",
        }
    ])
    .then((answer) => {
    //then we send the sqlQuery variable (which holds a query), and the value inputted by the user to the company_db
    const sqlQuery = `INSERT INTO department (name) VALUES (?)`
    connection.query(sqlQuery, answer.department, function (err, results) {
        if (err) throw err;
        
    });
    //Runs viewNewAddedDepartment() to confirm the user has added a department successfully, and brings the user back to the initial prompt
    viewNewAddedDepartment();
    
    })
}

//Adds a new employee to the employee table saving the values the user inputs after answering the prompts
addEmployee = () => {
    //Selects the role.title, role.salary, and role.department_id from the role table.
    const sqlQuery = `Select * from role`
    connection.query(sqlQuery, function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                //prompts the user on what the first name of the new employee being added is
                name: "first_name",
                type: "input",
                message: "What is the Employee's first name?"
            },
            {
                //prompts the user on what the last name of the new employee being added is
                name: "last_name",
                type: "input",
                message: "What is the Employee's last name?"
            },
            {
                //prompts the user on what the manager id of the new employee being added is
                name: "manager_id",
                type: "input",
                message: "What is the Employee's manager ID?"
            },
            {
                //Prompts the use to select what the role of the new employee is an to remember the role ID selected as well.
                name: "role",
                type: "list",
                message: "Please select the Employee's role",
                choices: function getRoles () {
                                let roleChoices = []
                                    results.forEach(results => {
                                        roleChoices.push(
                                            `ID:${results.id} ${results.title}`
                                            
                                        );
                                    })
                                return roleChoices;
                            }
            },
            {
                //prompts the user on what was the role ID of the role selected in the previous prompt for the new employee we are adding.
                name: "role_id",
                type: "input",
                message: "What is the Role ID of the new Employee?"
            },
        ])
        .then((answer) => { 
        //Inserts the query, and values received from the user (first_name, last_name, role_id, manager_id) and sends to the company_db
        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        const values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
        connection.query(sqlQuery, values, function (err, results) {
            if (err) throw err;
                        
        });
        //Runs viewNewAddedEmployee() to confirm the user has added an employee successfully, and brings the user back to the initial prompt
        viewNewAddedEmployee();
        })
    });
}
