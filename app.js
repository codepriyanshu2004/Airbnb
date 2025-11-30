const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const engine = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Reviews = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash")

const listings = require("./routes/listing.js")
const review = require("./routes/review.js")
const app= express()
let port = 8080;

async function main(params) {

    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");

    
}


main()
.then(()=>{
    console.log("Connected to Db");
    
})


app.get("/",(req,res)=>{
    console.log("You are in the root");
    
})



// app.get("/testListing", async(req,res)=>{

//     let sampleListting = new Listing({
//         title: "My New Villa",
//         description:"By the beach",    // for tesing only
//         price:1200,
//         location:"Calangute ,Goa",
//         country:"India"
//     });

//        await sampleListting.save();
//         console.log("sample was saved");
//         res.send("sucessfull test");

        
//    });


app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"public")));


const sessionOptionsS ={
    secret:"mysuperstring",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}

app.use(session(sessionOptionsS));
app.use(flash());

  app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
      res.locals.errorMsg = req.flash("error");
      next();
  })


app.use("/listings",listings);
app.use("/listings/:id/reviews",review)

// //Index route

// app.get("/listing",wrapAsync(async(req,res)=>{
//    const allListings = await Listing.find({});
//    res.render("listings/index.ejs",{allListings});
// }));

// // New route

// app.get("/listings/new",async(req,res)=>{
//     res.render("listings/new.ejs")
// })

// //Create route

// app.post("/listings",wrapAsync(async(req,res,next)=>{

    
//     // let {title, description,image,price,location,country} = req.body;

//     // let newlisting =  new Listing({
//     //          title:title,
//     //          description:description,
//     //          image:image,
//     //          price:price,
//     //          location:location,
//     //          country:country
//     //   });


//     if(!req.body.listing){
//         throw new ExpressError(400,"send valid data for listing");
//     }



//       const newlisting = new Listing(req.body.listing);
     

//        if(!newlisting.title){
//           throw new ExpressError(400,"title is missing")
//       }

//       if(!newlisting.description){
//           throw new ExpressError(400,"Description is missing")
//       }

//        if(!newlisting.location){
//           throw new ExpressError(400,"location is missing")
//       }

//        if(!newlisting.country){
//           throw new ExpressError(400,"country is missing")
//       }


//       newlisting.save().then((res)=>{
//         console.log(res);
        
//       })
//        res.redirect("/listing")
// })
// );


// // show route

// app.get("/listings/:id",wrapAsync(async(req,res,next)=>{
//     let {id} = req.params;
//   const listing =   await Listing.findById(id).populate("reviews");
//   res.render("listings/show.ejs",{listing})
// })
// );

// //edit route

// app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
//     let {id} = req.params;

//     let listing= await Listing.findById(id)
//     res.render("listings/edit.ejs",{listing})
// }));

// //update route
// app.put("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id} = req.params;
  
//        if(!req.body.listing){
//         throw new ExpressError(400,"send valid data for listing");
//     }

//       let data= await Listing.findByIdAndUpdate(id,{...req.body.listing});
//        console.log(data);
 

//      res.redirect(`/listings/${id}`)

// }));

// //Delete route

// app.delete("/listings/:id/delete",wrapAsync(async(req,res)=>{
//     let {id} = req.params;
    
//    let deleteList= await Listing.findByIdAndDelete(id);
//    console.log(deleteList);
   
//   res.redirect("/listing")
// }));

//Reviews
//Post Route

// app.post("/listings/:id/reviews",wrapAsync(async(req,res)=>{
 
//     let listing = await Listing.findById(req.params.id);

//       if(!req.body.review){
//         throw new ExpressError(400,"send valid data for review");
//     }

//     let newReview = new Reviews(req.body.review);

//     if (!newReview.rating) {
        
//           throw new ExpressError(400,"send valid data for rating");
//     }
   
//      if (!newReview.comment) {
        
//           throw new ExpressError(400,"send valid data for comment");
//     }



//     listing.reviews.push(newReview);

//     newReview.save();
//     listing.save();
    
//     res.redirect(`/listings/${listing._id}`)
// })

// );

// app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;

//     // Remove review reference from listing model
//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

//     // Delete the review itself from review model
//     await Reviews.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
// }));

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


app.use((err,req,res,next)=>{
   let {status=500 , message="something is wrong"} = err;
//    res.status(statusCode).send(message);
  res.status(status).render("listings/error.ejs",{message})
})


app.listen(port,()=>{
    console.log("Server is listening at 3000");
    
})

