const express = require("express");
const mongoose = require("mongoose");
const Listening = require("./models/listing.js")
const path = require("path");

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

//     let sampleListting = new Listening({
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


app.get("/listing",async(req,res)=>{
   const allListings = await Listening.find({});
   res.render("listings/index.ejs",{allListings});
})


app.listen(port,()=>{
    console.log("Server is listening at 3000");
    
})

