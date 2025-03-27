
const mongoose = require('mongoose');


const theaterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:false,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
}, {timestamps: true});

const Theater = mongoose.model('theater', theaterSchema);


module.exports = Theater;