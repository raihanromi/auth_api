const User = require("../models/userModel");
const {v4 : uuidv4} = require("uuid")
const {setUser} = require("../service/authService")


//TODO : encrypt the password before saving in the DB
const handleUserSingup = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await User.create({ name, email, password });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(user)
  if (!user) {
    return res.redirect("/login");
  }
  const sessionId = uuidv4()
  setUser(sessionId,user)
  res.cookie("uid",sessionId)

  return res.redirect("/");
};


const getAllUser = async (req, res) => {
  const response = await User.find({});
  res.send(response);
};


const getUserProfile = (req,res)=>{
  res.render("userProfile")
}


module.exports = {
  handleUserSingup,
  getAllUser,
  handleUserLogin,
  getUserProfile
};
