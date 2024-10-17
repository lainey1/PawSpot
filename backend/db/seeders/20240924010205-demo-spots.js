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
          city: "San Francisco",
          state: "California",
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
          city: "Sedona",
          state: "Arizona",
          country: "United States of America",
          lat: 34.8697,
          lng: -111.7609,
          name: "Tranquil Treehouse",
          description:
            "Experience the magic of nature in the Tranquil Treehouse, an enchanting escape perched among the treetops.",
          price: 200.0,
        },
        {
          ownerId: 3,
          address: "101 Beachside Blvd",
          city: "Charleston",
          state: "South Carolina",
          country: "United States of America",
          lat: 32.7765,
          lng: -79.9311,
          name: "Beachfront Bungalow",
          description:
            "Relax in a cozy beachfront bungalow. A paradise for dogs who love the sand!",
          price: 180.0,
        },
        {
          ownerId: 4,
          address: "202 Cozy Cottage Ct",
          city: "Asheville",
          state: "North Carolina",
          country: "United States of America",
          lat: 35.5951,
          lng: -82.5515,
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
          city: "Portland",
          state: "Oregon",
          country: "United States of America",
          lat: 45.5155,
          lng: -122.6793,
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
          city: "Savannah",
          state: "Georgia",
          country: "United States of America",
          lat: 32.0809,
          lng: -81.0912,
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
          city: "New Orleans",
          state: "Louisiana",
          country: "United States of America",
          lat: 29.9511,
          lng: -90.0715,
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
