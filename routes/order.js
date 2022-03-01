
const express = require('express')
const router = express.Router();
const {Order} = require ('../models/orders')
const {OrderItem} = require('../models/orders')


router.get('/',async(req,res)=>{

    const orderlist = await Order.find();
    if(!orderlist){
        res.status(400).send('orders not found')
    }
    else{
        res.status(200).send(orderlist)
    }
})


router.post('/', async (req,res)=>{
    const orderItemsIds =  req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    })
   // const orderItemsIdsResolved =  await orderItemsIds;

    // const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
    //     const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
    //     const totalPrice = orderItem.product.price * orderItem.quantity;
    //     return totalPrice
    // }))

    // const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
       orderItems: orderItemsIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        // /totalPrice: totalPrice,
        user: req.body.user,
    })
    order.save().then((orderdata=>{
        res.status(200).send(orderdata)
    })).catch((err=>{
        console.log(err)
    }))
})


router.put('/:id',async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).send('the order cannot be update!')

    res.send(order);
})



module.exports =router;