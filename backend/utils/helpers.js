// backend/utils/helpers.js

// Helper to build pagination params
const parsePagination = (page, size) => {
  const parsedPage = Math.max(parseInt(page) || 1, 1);
  const parsedSize = Math.min(Math.max(parseInt(size) || 20, 1), 20);
  return { page: parsedPage, size: parsedSize };
};

// Helper to build the 'where' conditions for filtering
const buildFilters = (query) => {
  const where = {};
  // Add filtering logic dynamically based on query parameters
  ["city", "state", "country"].forEach((field) => {
    if (query[field]) where[field] = query[field];
  });
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
    price: Number(spot.price), // Ensure price is a number
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating: spot.dataValues.avgStarRating
      ? Number(spot.dataValues.avgStarRating).toFixed(1)
      : null,
    previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : null,
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
  parsePagination,
  buildFilters,
  formatSpot,
  getSpotInclude,
};
