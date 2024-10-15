// backend/routes/index.js
const express = require("express");
const router = express.Router();

// Import this file into the routes/index.js file and connect it to the router there.
const apiRouter = require("./api");
router.use("/api", apiRouter);

// STATIC ROUTES - Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  // Serve the frontend's index.html at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  //Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.json({});
  });
}

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
