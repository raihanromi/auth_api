const express = require("express");
const router = express.Router();
const {
  handleUserSingup,
  getAllUser,
  handleUserLogin,

} = require("../controllers/userController");

//post sing up information
router.post("/", handleUserSingup);

//post login information
router.post("/loginuser", handleUserLogin);

//get all the user information
router.get("/alluser", getAllUser);


module.exports = router;
