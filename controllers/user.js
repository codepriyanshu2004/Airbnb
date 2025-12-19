const user = require("../models/user");



module.exports.newSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
};

module.exports.createNewUser = async(req,res)=>{

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

};


module.exports.newLoginForm = (req,res)=>{
    res.render("users/login.ejs")
};




module.exports.LoginUser =  (req, res) => {
    req.flash("success", "Welcome back to Airbnb");
    res.redirect("/listings");
  };



  module.exports.LogoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);

        }
        req.flash("success","you are logged out!");
        res.redirect("listings")
    })
};