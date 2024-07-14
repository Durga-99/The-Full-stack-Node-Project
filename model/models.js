// // Name , phone Number , avg rating , total_no_rating


// const mongoose =  require("mongoose");

// const objects = mongoose.Schema({
//     name :{
//         type: String,
//         required : true

//     },
//     phoneNumber:{
//         type: String,
//         required: true
//     },
//     Review:{
//         type:Number,
//         required:true
//     },
//     UpdateReview:{
//         type:Number,
//         required:true

//     }

// });


// module.exports = mongoose.model("object",objects);


const mongoose = require("mongoose");

const model = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    Review: {
        type: Number,
        required: true,
        default: 0
    },
    UpdateReview: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("objects", model);
