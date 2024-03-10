"use strict";
/** Database setup for lego. */
const { Pool, Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {

  const databaseConfig = { connectionString: process.env.CONNECTION_STRING };
  db = new Pool(databaseConfig);

} else {
  db = new Client({
    host: "/var/run/postgresql/",
    database: getDatabaseUri()
  });
}


db.connect();

module.exports = db;