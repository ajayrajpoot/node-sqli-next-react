// db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { addUser } = require("../models/users");
// let dbConnection;
// Function to establish SQLite database connection
function connectDatabase() {
  const dbPath = path.resolve(__dirname, "db_sqlite", "database.db");
  global.dbConnection = new sqlite3.Database(dbPath);

  // Create a table (if not exists)
  dbConnection.serialize(() => {

    //role table 
    dbConnection.run(
      "CREATE TABLE role (id INTEGER PRIMARY KEY, role TEXT, create_at TEXT, update_at TEXT, status TEXT, create_by TEXT)",
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table role created");
        }
      }
    );

    //api table
    dbConnection.run(
      "CREATE TABLE api (id INTEGER PRIMARY KEY, api TEXT, create_at TEXT, update_at TEXT, status TEXT, create_by TEXT)",
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table api created");
        }
      }
    );

    //role_api table
    dbConnection.run(
      "CREATE TABLE role_api (id INTEGER PRIMARY KEY, role_id INT, api_id INT, create_at TEXT, update_at TEXT, status TEXT, create_by TEXT)",
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table role_api created");
        }
      }
    ); 

    //user_role table
    dbConnection.run(
      "CREATE TABLE user_role (id INTEGER PRIMARY KEY, user_id INT, role_id INT, create_at TEXT, update_at TEXT, status TEXT, create_by TEXT)",
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table user_role created");
        }
      }
    ); 

    //users table
    dbConnection.run(
      "CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, name TEXT, email TEXT, phone TEXT, password TEXT, isAdmin INT, create_at TEXT, update_at TEXT, status TEXT, role TEXT, create_by TEXT)",
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table users created");
          insertAdminUser();
        }
      }
    );

    //users payments
    dbConnection.run(
      "CREATE TABLE payments (id INTEGER PRIMARY KEY, user_id INT, amount INT, description TEXT, doc TEXT, status TEXT, create_at TEXT, update_at TEXT)",
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table payments created");
        }
      }
    );

  });

  return dbConnection;
}

// connectDatabase()
function insertAdminUser() {
  
  return addUser({
    username: "admin",
    name: "Administrator",
    email: "address@example.com",
    phone: "995823529",
    password: "admin",
    isAdmin: 1, 
    create_at: new Date(),
    update_at: new Date(),
    status: "approved",
    create_by: "0",
    admin: "admin"
  });
}
 
module.exports = { connectDatabase };
