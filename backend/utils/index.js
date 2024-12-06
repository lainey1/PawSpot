// Export all the utilities from individual files
const { handleValidationErrors } = require("./validation");
const { setTokenCookie, restoreUser, requireAuth } = require("./auth");
const { validateAllSpots, validateSpot } = require("./validate-endpoints");
const {
  getPaginationParams,
  buildFilterConditions,
  formatSpot,
  getSpotInclude,
} = require("./helpers");

module.exports = {
  handleValidationErrors,
  setTokenCookie,
  restoreUser,
  requireAuth,
  validateAllSpots,
  validateSpot,
  getPaginationParams,
  buildFilterConditions,
  formatSpot,
  getSpotInclude,
};
