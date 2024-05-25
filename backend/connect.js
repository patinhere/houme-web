import mysql from "mysql";

//auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pat022603!';

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pat022603!",
  database: "houme",
});
