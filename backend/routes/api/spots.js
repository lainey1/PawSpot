// backend/routes/api/spots.js
const express = require("express");
const { Op, fn, col, Sequelize } = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
} = require("../../db/models");
const { validationResult } = require("express-validator");
const {
  requireAuth,
  validateAllSpots,
  validateSpot,
  formatSpot,
} = require("../../utils");

const router = express.Router();

//* Get All Spots (with filters)

router.get("/", validateAllSpots, async (req, res) => {
  try {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
      req.query;

    // Set default values for pagination if not provided
    page = parseInt(page) || 1;
    size = parseInt(size) || 20;

    // Ensure page and size are within valid range
    if (page < 1) page = 1;
    if (size < 1 || size > 20) size = 20;

    // Create a `where` object to hold the filters
    const where = {};

    // Add filtering conditions based on query parameters
    if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
    if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
    if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
    if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
    if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice)
      where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

    // Query the database with filters and pagination
    const spots = await Spot.findAll({
      where,
      include: [
        {
          model: Review,
          attributes: [], // Don't return the reviews data
          required: false, // Allow spots with no reviews
        },
        {
          model: SpotImage,
          where: { preview: true }, // Only return preview images
          attributes: ["url"],
          required: false, // Allow spots with no images
        },
      ],
      group: ["Spot.id", "SpotImages.id"], // Grouping by Spot.id and SpotImages.id
      attributes: {
        include: [[fn("AVG", col("Reviews.stars")), "avgStarRating"]], // Calculate average star rating
      },
    });
    // Apply pagination manually
    const paginatedSpots = spots.slice((page - 1) * size, page * size);

    // Format the response
    const formattedSpots = paginatedSpots.map((spot) => {
      return formatSpot(spot);
    });

    // Return the response with pagination info
    return res.json({
      Spots: formattedSpots,
      page, // Include page in response
      size, // Include size in response
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//* Create a Spot
router.post("/", validateSpot, async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      imageUrls,
    } = req.body;

    const newSpot = await Spot.create({
      ownerId: userId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    if (imageUrls && imageUrls.length) {
      const spotImages = imageUrls.map((url, index) => ({
        spotId: newSpot.id,
        url,
        preview: index === 0,
      }));

      await SpotImage.bulkCreate(spotImages);
    }

    return res.status(201).json({
      id: newSpot.id,
      ownerId: newSpot.ownerId,
      address: newSpot.address,
      city: newSpot.city,
      state: newSpot.state,
      country: newSpot.country,
      lat: newSpot.lat,
      lng: newSpot.lng,
      name: newSpot.name,
      description: newSpot.description,
      price: newSpot.price,
      createdAt: newSpot.createdAt,
      updatedAt: newSpot.updatedAt,
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

//* Edit a Spot
router.put("/:spotId", requireAuth, async (req, res) => {
  const userId = req.user.id; // GET authenticated userId
  const { spotId } = req.params; // GET from URL
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    SpotImages,
  } = req.body;

  // const spot = await Spot.findByPk(spotId);

  const spot = await Spot.findByPk(spotId, {
    where: spotId,
    include: [
      {
        model: SpotImage,
        attributes: ["url"],
      },
    ],
    group: ["Spot.id", "SpotImages.id"], // Grouping by Spot.id and SpotImages.id
  });

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // Check if the authenticated user is the spot's owner
  if (spot.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      errors: {
        authorization: "Only the owner can edit this spot",
      },
    });
  }

  // After the spot exists and user is authorized, we run validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
      }, {}),
    });
  }

  //Update the spot with new details
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;

  await spot.save(); // save the updated spot

  // Update existing images
  if (SpotImages && SpotImages.length) {
    // Delete old images
    console.log("Image URLs received:", SpotImages);
    await SpotImage.destroy({ where: { spotId } });

    // Add new images
    const newSpotImages = SpotImages.map((image) => ({
      spotId: spotId,
      url: image.url,
      preview: image.preview,
    }));

    await SpotImage.bulkCreate(newSpotImages);
  }

  return res.status(200).json(spot);
});

//* GET all Spots owned by the Current User (v2) (CHECKED)
router.get("/current", async (req, res) => {
  try {
    // Get the current user's ID
    const userId = req.user.id;

    // Fetch spots owned by the current user
    const spots = await Spot.findAll({
      where: { ownerId: userId }, // Filter by the current user's ID
      include: [
        {
          model: Review,
          attributes: [], // Only need the stars for aggregation
          required: false,
        },
        {
          model: SpotImage,
          where: { preview: true }, // Only fetch preview images
          attributes: ["url"], // Only get the URL of the image
          required: false, // Include spots without preview images
        },
      ],
      group: ["Spot.id", "SpotImages.id"], // Group by Spot and SpotImage
      attributes: {
        include: [[fn("AVG", col("Reviews.stars")), "avgStarRating"]], // Calculate avgRating
      },
    });

    // Format the response
    const formattedSpots = spots.map((spot) => {
      return formatSpot(spot);
    });

    return res.json({ Spots: formattedSpots });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

//* Add an Image to a Spot based on the Spot's id (CHECKED)
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params; // from URL
  const userId = req.user.id; // Get the current user's ID from authentication
  const spot = await Spot.findByPk(spotId); // find spot by ID

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // Check if the authenticated user is the owner of the spot
  if (spot.ownerId !== userId) {
    return res.status(403).json({
      title: "Forbidden",
      message: "Only the owner can add images to this spot.",
    });
  }
  const { url, preview } = req.body;

  // Create the image for spot
  const image = await SpotImage.create({
    spotId: spot.id, //!FIX Need to associate the image with the spot
    url,
    preview,
  });

  // Create a response object without createdAt and updatedAt
  const response = {
    id: image.id,
    spotId: image.spotId,
    url: image.url,
    preview: image.preview,
  };

  return res.status(201).json(response);
});

//* GET details of a Spot by ID (CHECKED)
router.get("/:spotId", async (req, res) => {
  // GET from URL
  const { spotId } = req.params;

  //Query the Spot by ID
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  // Check if the spot exists
  if (!spot)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });

  // Query Reviews table for aggregation
  const reviews = await Review.findAll({
    where: { spotId },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "reviewCount"],
      [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
    ],
  });

  const reviewStats = reviews[0].dataValues; // Extract the aggregated values

  // Prepare response object
  const response = {
    id: spot.id,
    ownerId: spot.Owner.id,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgStarRating: reviewStats.avgStarRating || 0,
    numReviews: reviewStats.reviewCount || 0,
    SpotImages: spot.SpotImages,
    Owner: {
      id: spot.Owner.id,
      firstName: spot.Owner.firstName,
      lastName: spot.Owner.lastName,
    },
  };

  // Send the response
  return res.status(200).json(response);
});

//* Create a Review for a Spot based on the Spot's id (CHECKED)

router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  try {
    const { review, stars } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;

    // Check if the user has already submitted a review for this spot
    const errors = {};
    const existingReview = await Review.findOne({
      where: { spotId, userId },
    });

    if (existingReview) {
      return res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    }
    // Validate the input
    if (!review || typeof review !== "string" || review.trim() === "") {
      errors.review = "Review text is required";
    }
    if (!stars || !Number.isInteger(stars) || stars < 1 || stars > 5) {
      errors.stars = "Stars must be an integer from 1 to 5";
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors,
      });
    }

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Create a new review
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    // Return the newly created review
    return res.status(201).json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message, // For debugging, but avoid sending this in production
    });
  }
});

//* GET all reviews for a spot
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  // Check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  // Fetch reviews for the spot, include associated User and ReviewImages
  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        as: "User", // Use the alias defined in the association
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        as: "ReviewImages",
        attributes: ["id", "url"],
      },
    ],
  });

  return res.status(200).json({ Reviews: reviews });
});

//* DELETE a Spot by ID (CHECKED)
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params; // Extract spotId from route parameters
  const userId = req.user.id; // Get the current user's ID from authentication

  // Find the spot by ID
  const spot = await Spot.findByPk(spotId);

  // If the spot doesn't exist, return a 404 error
  if (!spot) {
    return res.status(404).json({
      title: "Resource Not Found",
      message: "Spot couldn't be found",
    });
  }

  // Check if the authenticated user is the owner of the spot
  if (spot.ownerId !== userId) {
    return res.status(403).json({
      title: "Forbidden",
      message: "You are not authorized to delete this spot.",
    });
  }

  // If the user is the owner, proceed to delete the spot
  await spot.destroy();

  // Return success message after deletion
  return res.status(200).json({
    message: "Successfully deleted",
  });
});

// ***** EXPORTS *****/

module.exports = router;
