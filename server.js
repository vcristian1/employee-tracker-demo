//Packages
const express = require("express");
const mysql2 = require("mysql2");

const PORT = process.env.PORT || 3001;
//Initialize our app saving it to the express method.
const app = express();

//Express Middleware handles data parsing
app.use(express.urlencoded ({extended: false}));
app.use(express.json());

//Connect to a database


//GET/POST/DELETE Routes


//Listen on PORT 
app.listen(PORT, () => {console.log(`Serving running on PORT ${PORT}`)});
