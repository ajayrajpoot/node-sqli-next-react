const { getUserByUsernameAndPassword } = require("../../models/users");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { login, refresh, logout } = require("../../controller/authController");

router.post("/api/login", login);
router.post("/api/refresh", refresh);
router.post("/api/logout", logout);

router.post("/api/loginOld", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsernameAndPassword(username);

    if (user) {
      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      // const passwordMatch = (password == user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      let SECRET_KEY = process.env.SECRET_KEY || "test";
      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log("token1", token, token.length);

      res
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          data: user,
          token,
          SECRET_KEY,
        });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
