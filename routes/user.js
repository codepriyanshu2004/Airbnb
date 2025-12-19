const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const { newSignupForm, createNewUser, LoginUser, LogoutUser, newLoginForm } = require("../controllers/user");
const router = express.Router();

router.get("/signup",newSignupForm);

router.post("/signup",wrapAsync(createNewUser));


router.get("/login",newLoginForm);



router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),   //middlware
//   (req, res) => {
//     req.flash("success", "Welcome back to Airbnb");
//     res.redirect("/listings");
//   }
    LoginUser
);

router.get("/logout",
    // (req,res,next)=>{
    // req.logout((err)=>{
    //     if(err){
    //         return next(err);

    //     }
    //     req.flash("success","you are logged out!");
    //     res.redirect("listings")
    // })
// }

  LogoutUser

)


module.exports = router;