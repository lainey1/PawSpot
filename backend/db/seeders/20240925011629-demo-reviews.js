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
          userId: 7, // purrfect_escape
          review:
            "Paw-sitively delightful! I could chase my tail all day here! The trailers are cozy, and the ambiance is just purr-fect for a relaxing getaway with my human. Every moment was filled with joy and wagging tails!",
          stars: 5,
          createdAt: "2024-08-28T14:38:14.866Z",
          updatedAt: "2024-08-28T14:38:14.866Z",
        },
        {
          spotId: 1,
          userId: 2, // FakeUser1
          review:
            "It was fine, but I expected more treats. Just decent. The location is nice, but my human said the snack selection could use a little more variety for us furry friends. Overall, an okay experience.",
          stars: 3,
          createdAt: "2024-08-16T23:21:22.635Z",
          updatedAt: "2024-08-16T23:21:22.635Z",
        },
        {
          spotId: 1,
          userId: 3, // Happy Paws
          review:
            "Absolutely paw-some! My dog and I had a tail-wagging good time exploring the park. The cozy trailers are perfect for cuddles after a day of adventure. We made new friends, and the staff were so friendly, even offering us extra treats!",
          stars: 5,
          createdAt: "2024-06-23T11:06:09.645Z",
          updatedAt: "2024-06-23T11:06:09.645Z",
        },
        {
          spotId: 1,
          userId: 4, // Furry Friend
          review:
            "What a paw-nderful getaway! The vibrant community made my cat feel right at home, and she loved lounging in the sunny spots. The quirky decor is a joy to explore, and my human was thrilled with all the pet-friendly amenities!",
          stars: 4,
          createdAt: "2024-07-16T02:22:37.278Z",
          updatedAt: "2024-07-16T02:22:37.278Z",
        },
        {
          spotId: 1,
          userId: 5,
          review:
            "Trailblazer Trailer Park is a fur-midable destination for pet lovers! My pup made so many new friends at the park. There were plenty of play areas and cozy spots for naps after our adventures. We can't wait to come back for more fun!",
          stars: 5,
          createdAt: "2024-10-12T08:45:37.342Z",
          updatedAt: "2024-10-12T08:45:37.342Z",
        },
        {
          spotId: 1,
          userId: 6,
          review:
            "A purr-fect place for a pet-cation! My cat explored every nook and cranny of the charming trailers. The friendly staff made us feel right at home, and the playful atmosphere was ideal for both relaxation and exploration. Highly recommended!",
          stars: 4,
          createdAt: "2024-09-25T13:22:15.768Z",
          updatedAt: "2024-09-25T13:22:15.768Z",
        },
        {
          spotId: 2,
          userId: 8,
          review:
            "Not worth the kibble I paid. I’ll stick to my favorite spot! While the environment was pleasant, I expected a bit more excitement for my adventures. My human said we’ll keep looking for better places!",
          stars: 2,
          createdAt: "2024-07-04T17:11:55.997Z",
          updatedAt: "2024-07-04T17:11:55.997Z",
        },
        {
          spotId: 3,
          userId: 2,
          review:
            "The best stay ever! I made friends with the squirrels! The space was perfect for exploring, and my human loved the nearby parks. Definitely a five-paw experience all around!",
          stars: 5,
          createdAt: "2024-08-30T20:03:22.412Z",
          updatedAt: "2024-08-30T20:03:22.412Z",
        },
        {
          spotId: 4,
          userId: 4,
          review:
            "A purr-fect getaway! Plenty of napping spots for me. The ambiance was so relaxing, and my human enjoyed the scenery. A lovely retreat that made for some memorable moments!",
          stars: 4,
          createdAt: "2024-06-17T15:58:43.874Z",
          updatedAt: "2024-06-17T15:58:43.874Z",
        },
        {
          spotId: 5,
          userId: 5,
          review:
            "Absolutely loved it! I ran and played till I dropped! The open spaces and friendly atmosphere made it the ideal place for us to romp around. Can't wait to return and have more adventures!",
          stars: 5,
          createdAt: "2024-07-22T10:34:50.593Z",
          updatedAt: "2024-07-22T10:34:50.593Z",
        },
        {
          spotId: 6,
          userId: 3,
          review:
            "Nice place, but the humans need to clean better. I found some dust bunnies! Overall, it was a fun experience, and my human enjoyed the amenities. Just a little more tidying would make it pawsitively perfect!",
          stars: 3,
          createdAt: "2024-09-14T18:20:34.124Z",
          updatedAt: "2024-09-14T18:20:34.124Z",
        },
        {
          spotId: 7,
          userId: 6,
          review:
            "Fabulous experience! I could sniff everything and everyone! The staff were super friendly, and my human loved the cozy trailers. We both had a fantastic time exploring together!",
          stars: 5,
          createdAt: "2024-07-28T08:59:28.291Z",
          updatedAt: "2024-07-28T08:59:28.291Z",
        },
        {
          spotId: 8,
          userId: 7,
          review:
            "My human was happy, and I got extra treats! What’s not to love? The vibrant community made for such a fun stay. I’ll definitely be barking about this place to all my furry friends!",
          stars: 4,
          createdAt: "2024-08-18T23:44:59.602Z",
          updatedAt: "2024-08-18T23:44:59.602Z",
        },
        {
          spotId: 2,
          userId: 7,
          review:
            "What a tranquil spot! My pup and I enjoyed long walks through the beautiful nature trails. The peaceful atmosphere was perfect for unwinding after a day of exploring. Can't wait to return for more outdoor adventures!",
          stars: 5,
          createdAt: "2024-06-12T05:29:15.477Z",
          updatedAt: "2024-06-12T05:29:15.477Z",
        },
        {
          spotId: 3,
          userId: 6,
          review:
            "A paws-itively charming place! The atmosphere was warm and welcoming, and the breakfast spread was simply delicious. My human loved the options, and I appreciated the tasty treats. We’ll definitely be back for more yummy mornings!",
          stars: 4,
          createdAt: "2024-10-07T10:16:41.894Z",
          updatedAt: "2024-10-07T10:16:41.894Z",
        },
        {
          spotId: 4,
          userId: 7,
          review:
            "What a pawsome getaway! The Beachfront Bungalow was perfect for me and my human. I spent hours digging in the sand and splashing in the waves. The cozy vibe made it feel like home, and the sunsets were simply breathtaking!",
          stars: 5,
          createdAt: "2024-07-19T16:11:03.716Z",
          updatedAt: "2024-07-19T16:11:03.716Z",
        },
        {
          spotId: 4,
          userId: 2,
          review:
            "A lovely stay by the beach! I had a great time frolicking in the sand, but I wish there were more pet-friendly snacks available. Still, it was a relaxing spot for my human and me, and we enjoyed our time soaking up the sun!",
          stars: 4,
          createdAt: "2024-09-02T13:42:28.058Z",
          updatedAt: "2024-09-02T13:42:28.058Z",
        },
      ],

      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
