// const {default:mongoose}=require("mongoose")
// const userSchema= new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     email:{
//         type:String,
//         require:true
//     },
//     image:String
// })
// module.export=mongoose.model('user',userSchema)
const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: String
});

// Define and export the model
const User = mongoose.model('User', userSchema); // Note: 'User' is typically capitalized for models

module.exports = User;
