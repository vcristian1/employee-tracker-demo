-- Pre-populate database below
USE company_db;
INSERT INTO department (name)
VALUES
    ("Engineering"),
    ("Intern"),
    ("Executive"),
    ("Information Technology"),
    ("Human Resources"),
    ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Accountant", 60000, 6),
    ("CPA", 120000, 6),
    ("Intern", 0, 2),
    ("CEO", 150000, 3),
    ("CFO", 150000, 3),
    ("IT Support", 50000, 4),
    ("Human Resources Representative", 60000, 5),
    ("Software Engineer 1", 120000, 1),
    ("Senior Software Engineer ", 180000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ("John", "Greene", 1),
    ("David", "Garcia", 2),
    ("Chris", "Pawlowski", 3),
    ("Craig", "Culbert", 4),
    ("Michael", "Honeycutt", 5),
    ("Daniel", "Aarnesss", 6),
    ("Robert", "DeLuca", 7),
    ("Ozzy", "Cardenas", 8),
    ("Bobby", "Stitt", 9);
    


