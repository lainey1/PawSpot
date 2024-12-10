// backend/app.js

const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const reviewImagesRouter = require("./routes/api/review-images");
const { ValidationError } = require("sequelize");

const { environment } = require("./config");
const isProduction = environment === "production";

// Initialize the Express application
const app = express();

// Import Routes
const routes = require("./routes");

// * Middleware setup **********
// Logging middleware (requests and responses)
app.use(morgan("dev"));

// Parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  app.use(cors()); // enable CORS (cross-origin sharing) only in development
}

// Set security headers with Helmet
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// Set CSRF token and method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// * Routes **********
app.use(routes);
app.use("/api/review-images", reviewImagesRouter);

// Handle unhandled requests
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// * Errors **********

// Handle Sequelize validation errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);

  if (!isProduction) {
    res.json({
      title: err.title || "Server Error",
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  } else {
    res.json({
      title: err.title || "Server Error",
      message: err.message,
      errors: err.errors,
    });
  }
});

// * Export the Express app
module.exports = app;
