
const { User } = require('../models/user') ;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



router.get(`/`,async (req,res)=>{
    let userdata = await User.find(req.params.id).select('-password')
    if(!userdata){
res.status(400).send('Data No Found')
    }
    else{
        res.status(200).send(userdata)
    }
})

router.get('/:id',async (req,res)=>{
    let userdata = await User.findById(req.params.id).select('-password')
    if(!userdata){
        res.status(400).send('Data No Found')
            }
            else{
                res.status(200).send(userdata)
            }
})

// router.post(`/`,async (req,res)=>{
//     let userdata = req.body
//     user = new User(userdata)
//     user.save((err,userdatainserted)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(userdatainserted)
//         }
//     })

// })

router.post(`/`,async(req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash:req.body.passwordHash,
        phone:req.body.phone,
        street:req.body.street,
        apprtment:req.body.apprtment,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        isAdmin:req.body.isAdmin,
    })
    user = await user.save();
    if(!user)
       console.log('no inserted')
    res.status(200).send(user)
})



router.put('/:id',async (req, res)=> {
    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )
    if(!user)
    return res.status(400).send('the user cannot be created!')
    res.send(user);
})





router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }
    if(req.body.password !== user.passwordHash) {
        const token = jwt.sign(
            {
                userId: user.id,
               isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }  
})


router.delete('/:id',async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
       return res.status(400).send('data not found')
    }
    else{
        res.status(200).send(user)
    }
})


router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

module.exports =router;