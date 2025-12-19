const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")
const Reviews = require("../models/review.js");
const { isLoggedIn, isReviewAuthor } = require("../middlware.js");
const { createReview, deleteReview } = require("../controllers/review.js");






router.post("/",isLoggedIn,  wrapAsync(createReview));

router.delete("/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(deleteReview));


module.exports = router;