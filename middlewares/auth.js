const { getUser } = require("../service/authService");



const restrictToLoggedinUserOnly = async (req, res, next) => {
  const userUid = req.cookies.uid;
  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUser(userUid);
  if (!user) {

    return res.redirect("/login")
  }


  res.user  = user 
  console.log("this is a middleware for auth")
  next()

};





module.exports ={
    restrictToLoggedinUserOnly
}
