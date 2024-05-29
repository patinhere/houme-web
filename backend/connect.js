import mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

//auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pat022603!';

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

export const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});
