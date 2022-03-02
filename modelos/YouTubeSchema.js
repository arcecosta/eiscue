const {Schema, model} = require("mongoose");

const YouTubeSchema = new Schema({
    name:{
        type:String,
    },
    url:{
        type:String,
    }
});

module.exports = model("YouTubeSchema", YouTubeSchema);