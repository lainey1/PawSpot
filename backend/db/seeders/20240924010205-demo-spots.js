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
          city: "Seattle",
          state: "Washington",
          country: "United States of America",
          lat: 37.7749,
          lng: -122.4194,
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
          name: "Tranquil Treehouse",
          description:
            "Experience the magic of nature in the Tranquil Treehouse, an enchanting escape perched among the treetops.",
          price: 200.0,
        },
        {
          ownerId: 3,
          address: "101 Beachside Blvd",
          city: "Miami",
          state: "Florida",
          country: "United States of America",
          lat: 25.7617,
          lng: -80.1918,
          name: "Beachfront Bungalow",
          description:
            "Relax in a cozy beachfront bungalow. A paradise for dogs who love the sand!",
          price: 180.0,
        },
        {
          ownerId: 4,
          address: "202 Cozy Cottage Ct",
          city: "Halifax",
          province: "Nova Scotia",
          country: "Canada",
          lat: 44.6488,
          lng: -63.5752,
          name: "Purrfect Retreat",
          description:
            "A charming cottage designed for cat lovers. Enjoy a serene environment with plenty of napping spots.",
          price: 140.0,
        },
        {
          ownerId: 5,
          address: "300 Happy Paws Ave",
          city: "Austin",
          state: "Texas",
          country: "United States of America",
          lat: 30.2672,
          lng: -97.7431,
          name: "Paws Paradise",
          description:
            "A fun-filled home for dogs, complete with a dog park and plenty of toys.",
          price: 160.0,
        },
        {
          ownerId: 6,
          address: "400 Catnip Lane",
          city: "Toronto",
          province: "Ontario",
          country: "Canada",
          lat: 43.6511,
          lng: -79.347015,
          name: "Catnip Cottage",
          description:
            "A delightful getaway for cats, featuring cat trees and sunny spots for lounging.",
          price: 130.0,
        },
        {
          ownerId: 7,
          address: "500 Bark Boulevard",
          city: "Chicago",
          state: "Illinois",
          country: "United States of America",
          lat: 41.8781,
          lng: -87.6298,
          name: "Bark N' Breakfast",
          description:
            "Enjoy a cozy stay with your furry friend. Breakfast included for humans and pets!",
          price: 145.0,
        },
        {
          ownerId: 8,
          address: "600 Whisker Way",
          city: "Montreal",
          province: "Quebec",
          country: "Canada",
          lat: 45.5017,
          lng: -73.5673,
          name: "Whisker Wonderland",
          description:
            "A cat-friendly haven with multiple play areas and cozy nooks for relaxation.",
          price: 125.0,
        },
        {
          ownerId: 1,
          address: "700 Tail Trails Road",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          lat: 39.7392,
          lng: -104.9903,
          name: "Tail Trails Retreat",
          description:
            "Perfect for dogs who love to hike. Surrounded by nature with beautiful trails.",
          price: 175.0,
        },
        {
          ownerId: 2,
          address: "800 Furry Friends Dr",
          city: "Calgary",
          province: "Alberta",
          country: "Canada",
          lat: 51.0447,
          lng: -114.0719,
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
