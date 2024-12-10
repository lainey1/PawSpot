// backend/routes/api/session.js

const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { User } = require("../../db/models");

const {
  setTokenCookie,
  restoreUser,
  handleValidationErrors,
} = require("../../utils");

const router = express.Router();

// Middleware: Validate login credentials
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Route: Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  try {
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });

    if (
      !user ||
      !bcrypt.compareSync(password, user.hashedPassword.toString())
    ) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      err.title = "Invalid credentials";
      err.errors = { credential: "The provided credentials were invalid." };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  } catch (error) {
    const err = new Error("An error occurred while trying to log in.");
    err.status = 500; // Internal Server Error
    return next(err);
  }
});

// Route: Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Route: Restore session user
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

// Export the router
module.exports = router;
