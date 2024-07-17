// import mysql from 'mysql2/promise';
// import 'dotenv/config.js';
const mysql = require('mysql2/promise');
require('dotenv/config');

// async function to init a database
async function initDatabase() {
  let dbconn;

  try {
    // create db connection
    dbconn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    // drop database if exists
    await dbconn.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);

    // create and use the database
    await dbconn.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    await dbconn.query(`USE ${process.env.DB_NAME}`);

    // create table
    await dbconn.query(`
      CREATE TABLE items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
      )
    `);

    // create seeds for the db
    let sampleItems = Array.from({ length: 48 }, (_, i) => [`Item ${i + 1}`, `This is the content for item ${i + 1}.`]);

    for (let item of sampleItems) {
      await dbconn.query('INSERT INTO items (name, description) VALUES (?, ?)', item);
    }

    // for logging in console
    console.log(`Database ${process.env.DB_NAME} initialized`);
  } catch (e) {
    // if there's something wrong in connecting the db, kill the process
    console.log('Error initializing database:', e);
    process.exit(1);
  } finally {
    // close connection if success
    if (dbconn) await dbconn.end();
  }
}

// run the init database function
initDatabase();
