const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const router = express.Router();

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
});

router.post("/signup",wrapAsync(async(req,res)=>{

    try {

        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);

        req.login(registerUser,(err)=>{
            if (err) {
                return (err);
            }
         req.flash("success","Welcome to Airbnb");
        res.redirect("/listings")
        
        })
      
        
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup")

    }

})
)


router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
});


router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
  (req, res) => {
    req.flash("success", "Welcome back to Airbnb");
    res.redirect("/listings");
  }
);

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);

        }
        req.flash("success","you are logged out!");
        res.redirect("listings")
    })
})


module.exports = router;