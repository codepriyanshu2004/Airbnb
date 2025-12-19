const Review = require("../models/review");

module.exports.createReview = async(req,res)=>{
 
    let listing = await Listing.findById(req.params.id);

      if(!req.body.review){
        throw new ExpressError(400,"send valid data for review");
    }

    let newReview = new Reviews(req.body.review);
     newReview.author = req.user._id;

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
};


module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from listing model
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself from review model
    await Reviews.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
};