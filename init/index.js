const mongoose = require("mongoose");
const initdata = require("./data.js")
const Listing = require("../models/listing.js")

async function main(params) {

    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");

    
}

main()
.then(()=>{
    console.log("Connected to Db");
    
})

const initDb = async ()=>{
    await Listing.deleteMany({});
   initdata.data=  initdata.data.map((obj)=>({...obj,owner:"69353f2553a05e53b86f46fa"}))
    await Listing.insertMany(initdata.data);
        
    console.log("data was initial");
    
};
initDb();