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
  getPaginationParams,
  buildFilterConditions,
  formatSpot,
  getSpotInclude,
};
