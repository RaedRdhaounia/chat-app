const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const RequestSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    email : {
        type: String,
    },
    body:{
        type : String,
        
    },
    name:{
        type : String
    },
    
});

module.exports = User = mongoose.model('request', RequestSchema);
