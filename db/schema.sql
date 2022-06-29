DROP DATABASE IF EXISTS company_db;
-- Creates the "company_db" database --
CREATE DATABASE company_db;

-- Makes it so all of the following code will affect company_db --
USE company_db

CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
    name VARCHAR(30) NOT NULL
);

-- role
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) to hold role title
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role belongs to

CREATE TABLE role (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

-- employee
-- id: INT PRIMARY KEY
-- first_name: VARCHAR(30) to hold employee first name
-- last_name: VARCHAR(30) to hold employee last name
-- role_id: INT to hold reference to employee role
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

CREATE TABLE employee (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,

    FOREIGN KEY(role_id)
    REFERENCES role(id),

    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
);


