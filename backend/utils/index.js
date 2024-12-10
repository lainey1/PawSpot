// Export all the utilities from individual files

const { setTokenCookie, restoreUser, requireAuth } = require("./auth");

const {
  handleValidationErrors,
  validateAllSpots,
  validateSpot,
} = require("./validation");

const {
  parsePagination,
  buildFilters,
  formatSpot,
  getSpotInclude,
} = require("./helpers");

module.exports = {
  // auth
  setTokenCookie,
  restoreUser,
  requireAuth,

  // validation
  handleValidationErrors,
  validateAllSpots,
  validateSpot,

  // helpers
  parsePagination,
  buildFilters,
  formatSpot,
  getSpotInclude,
};
