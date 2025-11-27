const mongoose = require("mongoose");
const Review = require("./review");
const {Schema} = require("mongoose")


const listingSchema = new mongoose.Schema({
    title:{
        type:String

    },

    description:{
        type:String
    },
    image:{
        type:String,
        default : "https://unsplash.com/photos/a-branch-of-a-tree-with-white-flowers-in-front-of-a-body-of-water-FiWw3RgBRlY",
        set:(v) => v=== "" ? "https://unsplash.com/photos/a-branch-of-a-tree-with-white-flowers-in-front-of-a-body-of-water-FiWw3RgBRlY": v,
    },

    price:{
        type:Number,
       
    },

    location:{
        type:String
    },

    country:{
        type:String
    },

    reviews:[

        {
            type:Schema.Types.ObjectId,
            ref:"Review",

        }
    ]

});

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}})
   }
})


const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;


