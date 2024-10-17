// backend/db/seeders/20240924235125-demo-spotImages

"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://img.sunset02.com/sunsetm/wp-content-uploads/2019-03-28UTC09/woof-ranch-doghouse-pd-workshop-pr-0718-900x506.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://as1.ftcdn.net/v2/jpg/08/80/77/54/1000_F_880775408_VJGz4UZswguBWphqDKX9xFYmeIMXrP3I.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://images.stockcake.com/public/4/f/3/4f375b6b-ccef-493b-9bcf-9a30d7a1fd68_large/enchanted-treehouse-scene-stockcake.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://as2.ftcdn.net/v2/jpg/05/04/26/85/1000_F_504268518_xp08vOJercavAzWr5urFX6uQo2MGz9CI.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.etsystatic.com/16097108/r/il/c7614d/3509021219/il_1588xN.3509021219_ansf.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://lifeonshadylane.com/wp-content/uploads/2017/04/5afaf69ab3518909fe575fe8de3d7f3d.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.pinimg.com/736x/38/36/2b/38362b33850aa9e31668788b8fe58df7.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://inhabitat.com/wp-content/blogs.dir/1/files/2016/04/Territorio-de-Zaguatas-Dog-Paradise-in-Costa-Rica-14-889x667.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://imgcdn.stablediffusionweb.com/2024/5/4/4f99254d-0104-43e3-bf45-f64f119ad6b9.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://deedoggy.com/cdn/shop/articles/vecteezy_playful-corgi-indulging-in-an-unexpected-treat-created-with_29841539.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://www.hollywoodkittyco.com/media/catalog/category/EFMC2.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://cdn.pixabay.com/photo/2024/05/08/08/25/forest-house-8747729_960_720.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://www.chinoscaringkennel.com/wp-content/uploads/sites/11/2020/05/97550370_s.jpg",
          preview: true,
        },
      ],
      options
    );
  },
  // async down(queryInterface, Sequelize) {
  //   options.tableName = "SpotImages";
  //   // await queryInterface.dropTable(options);
  //   return queryInterface.bulkDelete(options, null, {});
  // },

  // //! TESTING BELOW
  // async down(queryInterface, Sequelize) {
  //   return queryInterface.bulkDelete("SpotImages", null, options);
  // },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
