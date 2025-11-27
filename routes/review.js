const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")
const Reviews = require("../models/review.js")






router.post("/",wrapAsync(async(req,res)=>{
 
    let listing = await Listing.findById(req.params.id);

      if(!req.body.review){
        throw new ExpressError(400,"send valid data for review");
    }

    let newReview = new Reviews(req.body.review);

    if (!newReview.rating) {
        
          throw new ExpressError(400,"send valid data for rating");
    }
   
     if (!newReview.comment) {
        
          throw new ExpressError(400,"send valid data for comment");
    }



    listing.reviews.push(newReview);

    newReview.save();
    listing.save();
    
    res.redirect(`/listings/${listing._id}`)
})

);

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from listing model
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself from review model
    await Reviews.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));


module.exports = router;