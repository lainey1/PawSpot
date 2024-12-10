// backend/routes/index.js

const express = require("express");
const router = express.Router();

// Import the API router and connect it
const apiRouter = require("./api");
router.use("/api", apiRouter);

// Static Routes: Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  // Serve the frontend's index.html at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  // Serve static assets from the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html for all routes not starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

// Development-only: Add XSRF-TOKEN cookie for CSRF protection
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.json({});
  });
}

// Add XSRF-TOKEN cookie endpoint
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

// Export the router
module.exports = router;
