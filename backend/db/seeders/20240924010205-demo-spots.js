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
          address: "123 Wanderlust Way",
          city: "Nashville",
          state: "Tennessee",
          country: "United States of America",
          lat: 36.1627,
          lng: -86.7816,
          name: "Trailblazer Trailer Park",
          description:
            "Nestled in Nashville, this vibrant community welcomes adventurous pets and owners. Cozy trailers with quirky decor and easy access to attractions create the perfect atmosphere for fun and connection!",
          price: 120.0,
        },
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
            "Your peaceful retreat in nature! Serenity Haven offers tranquil landscapes for outdoor-loving pets, blending comfort with natural beauty. A perfect escape for relaxation and exploration awaits you here.",
          price: 150.0,
        },
        {
          ownerId: 1,
          address: "500 Bark Boulevard",
          city: "Chicago",
          state: "Illinois",
          country: "United States of America",
          lat: 41.8781,
          lng: -87.6298,
          name: "Bark N' Breakfast",
          description:
            "Enjoy a cozy stay at Bark N' Breakfast, where pets are always welcome! Delight in complimentary breakfasts in a charming atmosphere right in the heart of Chicago—a true home away from home!",
          price: 145.0,
        },
        {
          ownerId: 1,
          address: "101 Beachside Blvd",
          city: "Charleston",
          state: "South Carolina",
          country: "United States of America",
          lat: 32.7765,
          lng: -79.9311,
          name: "Beachfront Bungalow",
          description:
            "Relax in this cozy retreat by the beach! Enjoy sun-soaked days, evening strolls, and the soothing sound of waves. A paradise for dogs who love the shore, creating unforgettable beachside memories!",
          price: 180.0,
        },
        {
          ownerId: 1,
          address: "789 Woodland Ave",
          city: "Sedona",
          state: "Arizona",
          country: "United States of America",
          lat: 34.8697,
          lng: -111.7609,
          name: "Tranquil Treehouse",
          description:
            "Experience nature's magic in this enchanting treehouse! With breathtaking views and serene surroundings, it’s perfect for those seeking peace, adventure, and a touch of whimsy in Sedona.",
          price: 200.0,
        },
        {
          ownerId: 2,
          address: "202 Cozy Cottage Ct",
          city: "Asheville",
          state: "North Carolina",
          country: "United States of America",
          lat: 35.5951,
          lng: -82.5515,
          name: "Purrfect Retreat",
          description:
            "Discover Purrfect Retreat, a charming cottage for cat lovers! Filled with cozy napping spots and delightful decor, this serene Asheville getaway is ideal for feline friends and their humans.",
          price: 140.0,
        },
        {
          ownerId: 2,
          address: "300 Happy Paws Ave",
          city: "Austin",
          state: "Texas",
          country: "United States of America",
          lat: 30.2672,
          lng: -97.7431,
          name: "Paws Paradise",
          description:
            "Welcome to Paws Paradise, a fun-filled haven for dogs in Austin! With a spacious dog park and plenty of toys, your furry friend will have the time of their life in this vibrant, welcoming atmosphere.",
          price: 160.0,
        },
        {
          ownerId: 3,
          address: "400 Catnip Lane",
          city: "Portland",
          state: "Oregon",
          country: "United States of America",
          lat: 45.5155,
          lng: -122.6793,
          name: "Catnip Cottage",
          description:
            "Catnip Cottage is a delightful retreat for feline friends, featuring cat trees, interactive toys, and sunny lounging spots. This cozy Portland getaway ensures your cat has a purr-fect vacation!",
          price: 130.0,
        },
        {
          ownerId: 3,
          address: "600 Whisker Way",
          city: "Savannah",
          state: "Georgia",
          country: "United States of America",
          lat: 32.0809,
          lng: -81.0912,
          name: "Whisker Wonderland",
          description:
            "Step into Whisker Wonderland, a cat-friendly haven with play areas and cozy nooks for relaxation. This charming Savannah retreat offers your feline companions a delightful environment to explore and unwind.",
          price: 125.0,
        },
        {
          ownerId: 4,
          address: "700 Tail Trails Road",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          lat: 39.7392,
          lng: -104.9903,
          name: "Tail Trails Retreat",
          description:
            "Tail Trails Retreat is ideal for hiking dogs! Surrounded by stunning natural beauty in Denver, it offers plenty of space for exploration and unforgettable adventures with your furry friend.",
          price: 175.0,
        },
        {
          ownerId: 4,
          address: "800 Furry Friends Dr",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States of America",
          lat: 29.9511,
          lng: -90.0715,
          name: "Furry Friends Lodge",
          description:
            "Welcome to Furry Friends Lodge, a spacious haven for pets in New Orleans! With play areas and relaxing spots, this lodge blends fun and comfort, ensuring a delightful stay for all furry companions.",
          price: 190.0,
        },
        {
          ownerId: 5,
          address: "350 Ranch Road",
          city: "Bozeman",
          state: "Montana",
          country: "United States of America",
          lat: 45.676,
          lng: -111.0429,
          name: "Paws & Hooves Ranch",
          description:
            "Experience ranch life at Paws & Hooves Ranch, where pets roam freely in open spaces! Enjoy breathtaking views and outdoor adventures, creating unforgettable memories for pet lovers seeking excitement!",
          price: 160.0,
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
