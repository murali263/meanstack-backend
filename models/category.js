const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name: {
        type:String,
    },
    color: {
        type:String,
    },
    icon:{
        type:String,
    },
    image:{
        type:String,
    }
})

exports.Category = mongoose.model('Category',categorySchema)