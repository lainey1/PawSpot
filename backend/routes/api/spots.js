// backend/routes/api/spots.js

const express = require("express");
const { validationResult } = require("express-validator");
const { Sequelize, fn, col } = require("sequelize");

const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
} = require("../../db/models");

const {
  requireAuth,
  validateAllSpots,
  validateSpot,
  parsePagination,
  buildFilters,
  formatSpot,
} = require("../../utils");

const router = express.Router();

/*
 * Route: Get All Spots
 * Description: Fetch all spots with optional filters, pagination, and average star ratings.
 */
router.get("/", validateAllSpots, async (req, res) => {
  try {
    // Parse pagination and filters
    const { page, size } = parsePagination(req.query.page, req.query.size);
    const filters = buildFilters(req.query);

    // Fetch spots with aggregated data
    const spots = await Spot.findAll({
      where: filters,
      include: [
        {
          model: Review,
          attributes: [], // No review details needed
          required: false, // Include spots without reviews
        },
        {
          model: SpotImage,
          where: { preview: true }, // Fetch only preview images
          attributes: ["url"],
          required: false, // Include spots without images
        },
      ],
      group: ["Spot.id", "SpotImages.id"], // Ensure correct aggregation
      attributes: {
        include: [[fn("AVG", col("Reviews.stars")), "avgStarRating"]], // Calculate average star rating
      },
    });

    // Paginate results
    const paginatedSpots = spots.slice((page - 1) * size, page * size);

    // Respond with formatted data
    res.json({
      Spots: paginatedSpots?.map(formatSpot),
      page,
      size,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/*
 * Route: Get Spot Details
 * Description: Fetch detailed information about a specific spot, including owner details, images, and review stats.
 */
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;

  try {
    // Fetch the spot by its ID, including related images and owner details
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

    // If the spot doesn't exist, return a 404 error
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Fetch aggregated review data for the spot
    const reviewStats = await Review.findOne({
      where: { spotId },
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "reviewCount"],
        [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
      ],
      raw: true, // Simplifies accessing the aggregated data
    });

    // Format the response object
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
      avgStarRating: parseFloat(reviewStats.avgStarRating || 0).toFixed(1),
      numReviews: parseInt(reviewStats.reviewCount || 0, 10),
      SpotImages: spot.SpotImages,
      Owner: {
        id: spot.Owner.id,
        firstName: spot.Owner.firstName,
        lastName: spot.Owner.lastName,
      },
    };

    // Send the formatted response
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching spot details:", error.message); // Log error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
});

/*
 * Route: Create New Spot
 * Description: Create a new spot and optionally add associated images
 */
router.post("/", validateSpot, requireAuth, async (req, res) => {
  try {
    const userId = req.user.id; // Extract authenticated user's ID
    const { imageUrls, ...spotData } = req.body; // Separate images from spot data

    // Create the new spot
    const newSpot = await Spot.create({ ...spotData, ownerId: userId });

    // If images are provided, bulk create SpotImages
    if (imageUrls?.length) {
      const spotImages = imageUrls.map((url, index) => ({
        spotId: newSpot.id,
        url,
        preview: index === 0, // Set the first image as the preview
      }));

      await SpotImage.bulkCreate(spotImages);
    }

    res.status(201).json(newSpot);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

/*
 * Route: Edit a Spot
 * Description: Update a spot's details and associated images, if provided.
 */

router.put("/:spotId", validateSpot, requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;
  const { SpotImages, ...spotUpdates } = req.body;

  try {
    // Find the spot by ID, including its images
    const spot = await Spot.findByPk(spotId, {
      include: [{ model: SpotImage, attributes: ["url"] }],
    });

    // If the spot doesn't exist, return a 404 error
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if the authenticated user is the owner of the spot
    if (spot.ownerId !== userId) {
      return res.status(403).json({
        message: "Forbidden",
        errors: { authorization: "Only the owner can edit this spot" },
      });
    }

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
      }, {});
      return res
        .status(400)
        .json({ message: "Bad Request", errors: formattedErrors });
    }

    // Update the spot's details
    Object.assign(spot, spotUpdates);
    await spot.save();

    // Handle SpotImages if provided
    if (SpotImages?.length) {
      // Remove existing images
      await SpotImage.destroy({ where: { spotId } });

      // Bulk create new images
      const newSpotImages = SpotImages.map(({ url, preview }) => ({
        spotId,
        url,
        preview,
      }));
      await SpotImage.bulkCreate(newSpotImages);
    }

    // Return the updated spot
    return res.status(200).json(spot);
  } catch (error) {
    console.error("Error updating spot:", error.message); // Log error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
});

/*
 * Route: Delete a Spot
 * Description: Delete a spot if owner.
 */
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  // Validate spotId
  if (isNaN(spotId)) {
    return res.status(400).json({
      status: "error",
      title: "Bad Request",
      message: "Invalid Spot ID",
    });
  }

  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message, // For debugging, but avoid sending this in production
    });
  }
});

/*
 * Route: Create a Spot Review
 * Description: Check if user is the owner or has already posted a review
 */
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const { spotId } = req.params;
  const userId = req.user.id;

  try {
    // Initialize an object to hold validation errors
    const errors = {};

    // Check if the user has already submitted a review for this spot
    const existingReview = await Review.findOne({
      where: { spotId, userId },
    });

    if (existingReview) {
      return res.status(400).json({
        message: "User already has a review for this spot",
      });
    }

    // Validate the review and stars input
    if (!review || typeof review !== "string" || review.trim() === "") {
      errors.review = "Review text is required";
    }

    if (!stars || !Number.isInteger(stars) || stars < 1 || stars > 5) {
      errors.stars = "Stars must be an integer from 1 to 5";
    }

    // If there are validation errors, return a 400 response with the errors
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

    // Create the new review
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    // Return the newly created review data
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
    // Catch any unexpected errors and respond with a 500 status
    console.error(error); // For debugging
    return res.status(500).json({
      message: "Server Error",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

/*
 * Route: Get Spot Reviews
 * Description: Get reviews for the spot or show "NEW" if no reviews
 */
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Fetch reviews for the spot, including associated User and ReviewImages
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          as: "User", // Alias defined in the association
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
    });

    // Return reviews in the response
    return res.status(200).json({ Reviews: reviews });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while fetching the reviews.",
    });
  }
});

/*
 * Route: Get All Spots Owned by User
 * Description: Fetch all spots owned by user
 */
router.get("/current", async (req, res) => {
  try {
    const userId = req.user.id;

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

    const formattedSpots = spots.map((spot) => {
      return formatSpot(spot);
    });

    return res.json({ Spots: formattedSpots });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

// ********** Route: Add Image to Spot **********
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);

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
    spotId: spot.id,
    url,
    preview,
  });

  const response = {
    id: image.id,
    spotId: image.spotId,
    url: image.url,
    preview: image.preview,
  };

  return res.status(201).json(response);
});

// ***** EXPORTS *****/

module.exports = router;
