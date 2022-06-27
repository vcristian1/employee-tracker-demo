DROP DATABASE IF EXISTS company_db
-- Creates the "company_db" database --
CREATE DATABASE company_db

-- Makes it so all of the following code will affect company_db --
USE company_db

-- Create 3 tables for Department, Role, and Employee 

-- Department
-- id: INT PRIMARY KEY
-- name: VARCHAR(30) to hold department name

CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100) NOT NULL
);



-- role
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) to hold role title
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role belongs to

-- employee
-- id: INT PRIMARY KEY
-- first_name: VARCHAR(30) to hold employee first name
-- last_name: VARCHAR(30) to hold employee last name
-- role_id: INT to hold reference to employee role
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)