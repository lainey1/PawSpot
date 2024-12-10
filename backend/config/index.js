// backend/config/index.js

// Export configuration object
module.exports = {
  // Set the environment (default to "development"  if not provided)
  environment: process.env.NODE_ENV || "development",

  // Set the port for the application (default 8000 if not provided)
  port: process.env.PORT || 8000,

  // File path for the database (required for certain setups)
  dbFile: process.env.DB_FILE,

  // Configuration for JSON Web Tokens
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
