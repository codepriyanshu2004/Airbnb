const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")



//Index route

router.get("/",wrapAsync(async(req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
}));

// New route

router.get("/new",async(req,res)=>{
    res.render("listings/new.ejs")
})

//Create route

router.post("/",wrapAsync(async(req,res,next)=>{

    
    // let {title, description,image,price,location,country} = req.body;

    // let newlisting =  new Listing({
    //          title:title,
    //          description:description,
    //          image:image,
    //          price:price,
    //          location:location,
    //          country:country
    //   });


    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }



      const newlisting = new Listing(req.body.listing);
     

       if(!newlisting.title){
          throw new ExpressError(400,"title is missing")
      }

      if(!newlisting.description){
          throw new ExpressError(400,"Description is missing")
      }

       if(!newlisting.location){
          throw new ExpressError(400,"location is missing")
      }

       if(!newlisting.country){
          throw new ExpressError(400,"country is missing")
      }


      newlisting.save().then((res)=>{
        console.log(res);
        
      })

      req.flash("success","New Listing Created!")
       res.redirect("/listings")
})
);


// show route

router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
  const listing =   await Listing.findById(id).populate("reviews");
  if(!listing){
      req.flash("error","Cureently not exits");
     return res.redirect("/listings")
  }
  res.render("listings/show.ejs",{listing})
})
);

//edit route

router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;

    let listing= await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
}));

//update route
router.put("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
  
       if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }

      let data= await Listing.findByIdAndUpdate(id,{...req.body.listing});
       console.log(data);
 
       req.flash("success","Edited")
     res.redirect(`/listings/${id}`)

}));

//Delete route

router.delete("/:id/delete",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    
   let deleteList= await Listing.findByIdAndDelete(id);
   console.log(deleteList);
   
  res.redirect("/listings")
}));

module.exports = router;