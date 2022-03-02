const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name:{
        type:String,
    },
    rank:{
        type:Number,
        default:0,
    }
});

module.exports = model("UserSchema", userSchema);