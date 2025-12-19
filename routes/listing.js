const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middlware.js");
const { index, renderNewForm, createListings, showListings, editListing, editForm, deleteListing } = require("../controllers/listings.js");



//Index route

router.get("/",wrapAsync(index));

// New route

router.get("/new",isLoggedIn,renderNewForm);

//Create route

router.post("/",isLoggedIn,wrapAsync(createListings));


// show route

router.get("/:id",wrapAsync(showListings));

//edit route

router.get("/:id/edit",isLoggedIn,wrapAsync(editForm))

//update route
router.put("/:id",isOwner,isLoggedIn,wrapAsync(editListing))
//Delete route

router.delete("/:id/delete",isOwner,isLoggedIn,wrapAsync(deleteListing))
module.exports = router;