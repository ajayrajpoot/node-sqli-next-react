const { getUser, addUser, updateUser, deleteUser } = require("../models/users");

const express = require("express");
const router = express.Router();
 
// API endpoint to fetch all users
router.get("/api/users", async (req, res) => {
  try {
    let user = await getUser();
    res.status(200).json({ success: true, message: "", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success:false, error: error.message });
  }
});

router.post("/api/users/add", async (req, res) => {
  try {
    let params = req.body;

    // Hash the password
    const hashedPassword = params.password; //await bcrypt.hash(params.password, 10);

    params.password = hashedPassword;

    let par = {};

    if (params.username) par.username = params.username;
    if (params.name) par.name = params.name;
    if (params.email) par.email = params.email;
    if (params.phone) par.phone = params.phone;
    if (params.password) par.password = params.password;
    if (params.role) par.role = params.role;

    let result = await addUser(par);

    res.status(200).json({ success: true, message: "", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.put("/api/users/update/:id", async (req, res) => {
  try {
    let params = req.body;

    console.log ("params", params);
    let par = {};

    if (params.username) par.username = params.username;
    if (params.name) par.name = params.name;
    if (params.email) par.email = params.email;
    if (params.phone) par.phone = params.phone;
    if (params.password) par.password = params.password;
    if (params.role) par.role = params.role;

    let result = await updateUser(req.params.id, par);

    res
      .status(200)
      .json({ success: true, message: "User Update", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/api/users/status/:id", async (req, res) => {
  try {
 
    let params = req.body;

    let par = {
      status: params.status,
    };

    let result = await updateUser(req.params.id, par);

    res
      .status(200)
      .json({ success: true, message: "User Update", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/api/users/delete/:id", async (req, res) => {
  try {
    let params = req.body;

    let par = {
      status: params.status,
    };
    let result = await deleteUser(req.params.id, par);

    res
      .status(200)
      .json({ success: true, message: "Delete User", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
