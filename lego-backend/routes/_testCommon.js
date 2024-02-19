"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  // --------- User
  await User.register({
    id: 1,
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });

  await User.register({
    id: 2,
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });

  await User.register({
    id: 3,
    username: "uAdmin",
    firstName: "UAF",
    lastName: "UAL",
    email: "userAdmin@user.com",
    password: "password3",
    isAdmin: true,
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
  }

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const uAdminToken = createToken({ username: "uAdmin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  uAdminToken
};
