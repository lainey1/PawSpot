// backend/db/seeders/20240925011629-demo-reviews
"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          review:
            "Paw-sitively delightful! I could chase my tail all day here!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 2,
          review: "It was fine, but I expected more treats. Just decent.",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 3,
          review: "Fur-tastic stay! I found the sunniest spot for my nap.",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review:
            "Not worth the kibble I paid. I’ll stick to my favorite spot!",
          stars: 2,
        },
        {
          spotId: 3,
          userId: 2,
          review: "The best stay ever! I made friends with the squirrels!",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 4,
          review: "A purr-fect getaway! Plenty of napping spots for me.",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 5,
          review: "Absolutely loved it! I ran and played till I dropped!",
          stars: 5,
        },
        {
          spotId: 6,
          userId: 3,
          review:
            "Nice place, but the humans need to clean better. I found some dust bunnies!",
          stars: 3,
        },
        {
          spotId: 7,
          userId: 6,
          review: "Fabulous experience! I could sniff everything and everyone!",
          stars: 5,
        },
        {
          spotId: 8,
          userId: 7,
          review:
            "My human was happy, and I got extra treats! What’s not to love?",
          stars: 4,
        },
      ],

      options
    );
  },

  // async down(queryInterface, Sequelize) {
  //   options.tableName = "Reviews";
  //   // await queryInterface.dropTable(options);
  //   return queryInterface.bulkDelete(options, null, {});
  // },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
