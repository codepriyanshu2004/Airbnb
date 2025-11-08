const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override")

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
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));


app.get("/listing",async(req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
})

// New route
app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs")
})

//Create route

app.post("/listings",async(req,res)=>{
    let {title, description,image,price,location,country} = req.body;

    let newlisting =  new Listing({
             title:title,
             description:description,
             image:image,
             price:price,
             location:location,
             country:country
      });

      res.redirect("/listing")

      newlisting.save().then((res)=>{
        console.log(res);
        
      })
})


// show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
  const listing =   await Listing.findById(id);
  res.render("listings/show.ejs",{listing})
})

//edit route

app.get("/listings/:id/edit",async(req,res)=>{
       let {id} = req.params;

    let listing= await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;


 let data= await Listing.findByIdAndUpdate(id,{...req.body.listing});
 console.log(data);
 

     res.redirect("/listing")

});

app.delete("/listings/:id/delete",async(req,res)=>{
    let {id} = req.params;
    
   let deleteList= await Listing.findByIdAndDelete(id);
   console.log(deleteList);
   
  res.redirect("/listing")
})



app.listen(port,()=>{
    console.log("Server is listening at 3000");
    
})

