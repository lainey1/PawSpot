// Export all the utilities from individual files
const {
  handleValidationErrors,
  validateAllSpots,
  validateSpot,
} = require("./validation");
const { setTokenCookie, restoreUser, requireAuth } = require("./auth");
const {
  getPaginationParams,
  buildFilterConditions,
  formatSpot,
  getSpotInclude,
} = require("./helpers");

module.exports = {
  handleValidationErrors,
  validateAllSpots,
  validateSpot,

  setTokenCookie,
  restoreUser,
  requireAuth,

  getPaginationParams,
  buildFilterConditions,
  formatSpot,
  getSpotInclude,
};
