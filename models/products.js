const mongoose = require('mongoose')
const { Category } = require('./category')


const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    richdescription:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:'',
    },
    images:{
        type:String
    },
    brand:{
        type:String,
        required:true,
    },
    price:{
        price:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Category,
        required:true,
    },
    countInStock: {
        type: Number,
        required: true,
        min:0,
        max:200,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    rateing:{
        type:Number,
        default:'',
    },
    numreview:{
        type:Number,
        default:''

    },
    dateCreated:{
        type:Date,
        default:Date.now,
    }
    

})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});
exports.Product = mongoose.model('Product',productSchema)

