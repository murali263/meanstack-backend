const {Product} = require('../models/products') ;
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, '../public/upload');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });
  

//get api
router.get(`/`, async (req, res) =>{
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category')
    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})
//get specifc id
router.get('/:id', async (req,res)=>{
    const product =  await Product.findById(req.params.id);
    if(!product){
        res.status(400).send('data doesnt matched')
    }
    else{
        res.status(200).send(product)
    }
})
//get featured count
router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})
 
 //post api
 
 router.post(`/`,uploadOptions.single('image'), async(req,res)=>{
     const category = await Category.findById(req.body.category);
     if(!category) return res.status(400).send('not exist category')
     
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
     const product = new Product({
         name: req.body.name,
         image: `${basePath}${fileName}`,
         countInStock: req.body.countInStock,
         description:req.body.description,
         richdescription:req.body.richdescription,
         images:req.body.images,
         brand:req.body.brand,
         price:req.body.price,
         category:req.body.category,
         rateing:req.body.rateing,
         numreview:req.body.numreview,
         isFeatured:req.body.isFeatured

     })
       product.save().then((productdata=>{
           res.status(200).send(productdata)
        //console.log(productdata)
       })).catch((err=>{
           console.log(err)
       }))
 })
 

 //delete api
router.delete('/:id',async(req,res)=>{
    Product.findOneAndRemove(req.params.id).then(product=>{
        if(product){
           return res.status(200).send('product was deleted')
        }
        else{
           return res.status(200).send('product not deleted')
        }
    }).catch((err=>{
      return  console.log(err)
    }))
})
//update api
 router.put(`/:id`, async(req,res)=>{
     if(!mongoose.isValidObjectId(req.params.id)){
         return res.status(401).send('invalid id')
     }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('not exist category')
    const product = await Product.findByIdAndUpdate(req.params.id,
        {  name: req.body.name,
            image: req.body.image,
            countInStock: req.body.countInStock,
            description:req.body.description,
            richdescription:req.body.richdescription,
            images:req.body.images,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            rateing:req.body.rateing,
            numreview:req.body.numreview,
            isFeatured:req.body.isFeatured
        },{new:true}
        );
        if(!product){
            res.status(401).send('data not updated')
            console.log(product)
        }else{
            res.status(200).send(product)
        }
})

//get count of api
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})


module.exports =router;