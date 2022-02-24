const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    gender : {
        type: Boolean
    },
    age:{
        type : Number,
        
    },
    bio:{
        type : String
    },
    hobbies :{
        type : [],
        default: [ {key : 10 , label : 'chat'}],
    },
    country :{
        type :[String]
    },
    blocked : {
        type : Boolean,
        default : false
    },
    pic:{
        type : String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzw8Q6UOf1CL3h4y3EkHM0qCE47S_-AyxAQ&usqp=CAU"
    },
   
});

module.exports = User = mongoose.model('users', UserSchema);


