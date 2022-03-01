const express = require('express');
const router = express.Router();
const {Category} = require ('../models/category');


router.post('/',async (req,res)=>{
    let category = new Category({
        name:req.body.name,
        color:req.body.color,
        icon:req.body.icon,
        image:req.body.image
    })
    category.save().then((categorydata=>{
        res.status(200).send(categorydata)
    })).catch((err)=>{
        console.log(err)
    })
})


router.get('/',async (req,res)=>{
    let category = await Category.find();
    if(!category){
        res.status(401).send('No category data')
    }
    else{
        res.status(200).send(category)
    }
})


router.delete('/:id',(req,res)=>{
    Category.findOneAndRemove(req.params.id).then(category=>{
        if(category){
           return res.status(200).send('deleted')
        }
        else{
            return res.status(400).send('not deleted')
        }

    }).catch(err=>{
        console.log(err)
    })
})


router.get('/:id',async (req,res)=>{
   const category = await Category.findById(req.params.id);

   if(!category){
       res.status(401).send('no data id')
   }
   else{
       res.status(200).send(category)
   }
})

router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
        color:req.body.color,
        icon:req.body.icon,
        image:req.body.image
        }
    )
    if(!category){
        res.status(401).send('data not updated')
    }else{
        res.status(200).send(category)
    }
})



module.exports= router;