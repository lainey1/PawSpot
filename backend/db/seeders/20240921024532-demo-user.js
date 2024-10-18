// backend/db/seeders/20240921024532-demo-user.js
"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "demo",
          lastName: "lition",
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "fake1",
          lastName: "user1",
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "fake2",
          lastName: "user2",
        },
        {
          email: "user3@user.io",
          username: "happy_paws12",
          hashedPassword: bcrypt.hashSync("password4"),
          firstName: "Happy",
          lastName: "Paws",
        },
        {
          email: "user4@user.io",
          username: "furry_friend54",
          hashedPassword: bcrypt.hashSync("password5"),
          firstName: "Furry",
          lastName: "Friend",
        },
        {
          email: "user5@user.io",
          username: "bark_and_play",
          hashedPassword: bcrypt.hashSync("password6"),
          firstName: "Bark",
          lastName: "Play",
        },
        {
          email: "user6@user.io",
          username: "purrfect_escape",
          hashedPassword: bcrypt.hashSync("password7"),
          firstName: "Purrfect",
          lastName: "Escape",
        },
        {
          email: "user7@user.io",
          username: "WhiskersNWonder",
          hashedPassword: bcrypt.hashSync("password8"),
          firstName: "Sarah",
          lastName: "Taylor",
        },
      ],
      { validate: true }
    );
    options;
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
