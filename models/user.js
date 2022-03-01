const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userschema =new  mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        default:'',
    },
    apprtment:{
        type:String,
        default:'',
    },
    city:{
        type:String,
        default:'',
    },
    zip:{
        type:String,
        default:'',
    },
    country:{
        type:String,
        default:'',
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})
userschema.virtual('id').get(function(){
    return this._id.toHexString();
})
userschema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User',userschema);
exports.userschema = userschema;

