// backend/db/seeders/20240924010205-demo-spots
"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "456 Serenity Street",
          city: "Los Angeles",
          state: "California",
          country: "United States of America",
          lat: 34.0522,
          lng: -118.2437,
          name: "Serenity Haven",
          description:
            "Welcome to Serenity Haven, your peaceful retreat in the heart of nature. Ideal for furry friends who enjoy outdoor adventures.",
          price: 150.0,
        },
        {
          ownerId: 2,
          address: "789 Woodland Ave",
          city: "Santa Cruz",
          state: "California",
          country: "United States of America",
          lat: 37.3328,
          lng: -74.006,
          name: "Learn Hub",
          description:
            "Experience the magic of nature in the Tranquil Treehouse, an enchanting escape perched among the treetops.",
          price: 200.0,
        },
        {
          ownerId: 3,
          address: "101 Beachside Blvd",
          city: "Santa Monica",
          state: "California",
          country: "United States of America",
          lat: 34.0207,
          lng: -118.4912,
          name: "Beachfront Bungalow",
          description:
            "Relax in a cozy beachfront bungalow. A paradise for dogs who love the sand!",
          price: 180.0,
        },
        {
          ownerId: 4,
          address: "202 Cozy Cottage Ct",
          city: "Petaluma",
          state: "California",
          country: "United States of America",
          lat: 38.2329,
          lng: -122.636,
          name: "Purrfect Retreat",
          description:
            "A charming cottage designed for cat lovers. Enjoy a serene environment with plenty of napping spots.",
          price: 140.0,
        },
        {
          ownerId: 5,
          address: "300 Happy Paws Ave",
          city: "San Diego",
          state: "California",
          country: "United States of America",
          lat: 32.7157,
          lng: -117.1611,
          name: "Paws Paradise",
          description:
            "A fun-filled home for dogs, complete with a dog park and plenty of toys.",
          price: 160.0,
        },
        {
          ownerId: 6,
          address: "400 Catnip Lane",
          city: "Burbank",
          state: "California",
          country: "United States of America",
          lat: 34.1808,
          lng: -118.308,
          name: "Catnip Cottage",
          description:
            "A delightful getaway for cats, featuring cat trees and sunny spots for lounging.",
          price: 130.0,
        },
        {
          ownerId: 7,
          address: "500 Bark Boulevard",
          city: "Fresno",
          state: "California",
          country: "United States of America",
          lat: 36.7378,
          lng: -119.7871,
          name: "Bark N' Breakfast",
          description:
            "Enjoy a cozy stay with your furry friend. Breakfast included for humans and pets!",
          price: 145.0,
        },
        {
          ownerId: 8,
          address: "600 Whisker Way",
          city: "Sacramento",
          state: "California",
          country: "United States of America",
          lat: 38.5767,
          lng: -121.4935,
          name: "Whisker Wonderland",
          description:
            "A cat-friendly haven with multiple play areas and cozy nooks for relaxation.",
          price: 125.0,
        },
        {
          ownerId: 1,
          address: "700 Tail Trails Road",
          city: "Napa",
          state: "California",
          country: "United States of America",
          lat: 38.2975,
          lng: -122.2869,
          name: "Tail Trails Retreat",
          description:
            "Perfect for dogs who love to hike. Surrounded by nature with beautiful trails.",
          price: 175.0,
        },
        {
          ownerId: 2,
          address: "800 Furry Friends Dr",
          city: "Redding",
          state: "California",
          country: "United States of America",
          lat: 40.5865,
          lng: -122.3917,
          name: "Furry Friends Lodge",
          description:
            "A spacious lodge for all pets, featuring play areas, pools, and relaxing spots.",
          price: 190.0,
        },
      ],

      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
