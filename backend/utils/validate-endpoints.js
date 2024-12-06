const { handleValidationErrors } = require("./validation");
const { check, query } = require("express-validator");

const validateAllSpots = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  query("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be between 1 and 20"),
  query("minLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Minimum latitude is invalid"),
  query("maxLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid"),
  query("minLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid"),
  query("maxLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid"),
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isDecimal()
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

// Helper to build pagination params
const getPaginationParams = (query) => {
  let { page, size } = query;
  page = parseInt(page) || 1;
  size = parseInt(size) || 20;
  page = page < 1 ? 1 : page;
  size = size < 1 || size > 20 ? 20 : size;
  return { page, size };
};

// Helper to build the 'where' conditions for filtering
const buildFilterConditions = (query) => {
  const where = {};
  // Add filtering logic here, for example:
  if (query.city) where.city = query.city;
  if (query.state) where.state = query.state;
  if (query.country) where.country = query.country;
  return where;
};

// Helper to format spots
const formatSpot = (spot) => {
  return {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    avgStarRating: spot.avgStarRating,
    imageUrl: spot.SpotImages[0]?.url || null, // assuming the first image is preview
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
  };
};

// Helper to include the common 'SpotImage' and 'Review' relations
const getSpotInclude = () => [
  {
    model: Review,
    attributes: [],
    required: false,
  },
  {
    model: SpotImage,
    where: { preview: true },
    attributes: ["url"],
    required: false,
  },
];

module.exports = {
  validateAllSpots,
  validateSpot,
  getPaginationParams,
  buildFilterConditions,
  formatSpot,
  getSpotInclude,
};
