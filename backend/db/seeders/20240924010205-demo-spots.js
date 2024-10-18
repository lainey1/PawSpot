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
            "Nestled in the heart of Nashville, Trailblazer Trailer Park offers a vibrant community for adventurous pets and their owners. Enjoy cozy trailers adorned with quirky decor, a welcoming atmosphere, and easy access to local attractions. Perfect for those seeking fun and connection!",
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
            "Welcome to Serenity Haven, your peaceful retreat in the heart of nature. This tranquil escape is ideal for furry friends who love outdoor adventures, featuring lush landscapes and serene spots for relaxation. Experience the perfect blend of comfort and natural beauty.",
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
            "Enjoy a cozy stay at Bark N' Breakfast, where your furry friend is always welcome. Delight in complimentary breakfasts for both humans and pets, all while surrounded by a charming atmosphere in the heart of Chicago. A true home away from home!",
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
            "Relax in the Beachfront Bungalow, a cozy retreat where the soothing sound of waves and the warm sand await. A paradise for dogs who love the beach, enjoy sun-soaked days and evening strolls along the shore while creating unforgettable memories.",
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
            "Experience the magic of nature in the Tranquil Treehouse, an enchanting escape perched among the treetops. With breathtaking views and serene surroundings, this unique getaway is perfect for those seeking peace, adventure, and a touch of whimsy!",
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
            "Discover Purrfect Retreat, a charming cottage designed specifically for cat lovers. Enjoy a serene environment filled with cozy napping spots and delightful decor. This tranquil getaway in Asheville is the ideal escape for feline friends and their humans.",
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
            "Welcome to Paws Paradise, a fun-filled home for dogs in the heart of Austin. With a spacious dog park and plenty of toys, your furry friend will have the time of their life. Experience a vibrant atmosphere where fun meets comfort!",
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
            "Catnip Cottage is a delightful getaway for your feline friends, featuring cat trees, interactive toys, and sunny spots for lounging. This cozy retreat in Portland ensures your cat has a purr-fect vacation, complete with all the amenities for relaxation and play.",
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
            "Step into Whisker Wonderland, a cat-friendly haven filled with multiple play areas and cozy nooks for relaxation. This charming retreat in Savannah provides a delightful environment where your feline companions can explore, play, and unwind.",
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
            "Tail Trails Retreat is the perfect destination for dogs who love to hike. Surrounded by stunning natural beauty and beautiful trails, this retreat in Denver offers plenty of space for exploration and unforgettable adventures with your furry friend.",
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
            "Welcome to Furry Friends Lodge, a spacious haven for all pets located in vibrant New Orleans. Featuring play areas, refreshing pools, and relaxing spots, this lodge offers a blend of fun and comfort for your furry companions to enjoy during their stay.",
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
            "Experience life on the ranch at Paws & Hooves Ranch, where furry companions can roam freely in wide-open spaces. Enjoy breathtaking scenic views and outdoor activities that will create unforgettable memories for pet lovers seeking adventure!",
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
