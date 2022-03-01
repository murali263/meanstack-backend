const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
       required: true,
    },
    zip: {
        type: String,
       required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);



/**
Order Example:

{
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "61317548e49f7dfe9518ba10"
        },
        {
            "quantity": 2,
            "product" : "61317580e49f7dfe9518ba13"
        }
    ],
    "shippingAddress1" : "Garivid Street , 45",
    "shippingAddress2" : "1-B",
    "city": "vskp",
    "zip": "535212",
    "country": "india",
    "phone": "9128344",
    "user": "5fd51bc7e39ba856244a3b44"
}

 */