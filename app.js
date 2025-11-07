const express = require("express");
const mongoose = require("mongoose");

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

app.listen(port,()=>{
    console.log("Server is listening at 3000");
    
})

