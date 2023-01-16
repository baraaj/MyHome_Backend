const Brouillon=require('../Models/Brouillon');
const fs=require('fs')
const multer=require('multer')
const path=require('path');
var ObjectId = require('mongodb').ObjectId;
var a=[];


const index=(req,res,next)=>{
    Brouillon.find()

.then((a)=>{
  
  res.status(200).json(a)
})
.catch((error)=>{
 return res.status(400).json({error})
})
}


const show=(req, res, next)=>{
   
        Brouillon.findOne({ _id: req.params.id })
          .then(Brouillon => res.status(200).json(Brouillon))
          .catch(error => res.status(404).json({ error }));
}


const store=(req,res,next)=>{
    let cl=new Brouillon();
    // eslint-disable-next-line no-lone-blocks
    {if(req.file && req.file.originalname)
        {cl=new Brouillon({...req.body,Logo:req.file.filename}, { strict: false });
       }
        else{cl=new Brouillon({...req.body}, { strict: false });
        }}
    cl.save()
     
    .then((a)=>{
        return res.status(203).json({a})
 
 
    })
    .catch((error)=>{
     return res.status(400).json({error})
    })
 }

const update=(req, res, next)=>{
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :"+req.params.id);
    
    if((req.file && req.file.originalname))
    {const updatedBrouillon={
        Titre:req.body.Titre,
        Description:req.body.Description,
        Image:req.file.filename
    };
    Brouillon.findByIdAndUpdate(
        req.params.id,
        {$set:updatedBrouillon},
        {new:true}
    ).then((a)=>{
        return res.status(203).json({updatedBrouillon})
 
 
    })
    .catch((error)=>{
     return res.status(400).json({error})
    })
}
else{
  {const updatedBrouillon={
    Titre:req.body.Titre,
    Description:req.body.Description,
    Image:req.file.filename
   
};
Brouillon.findByIdAndUpdate(
    req.params.id,
    {$set:updatedBrouillon},
    {new:true}
).then(()=>{
    return res.status(203).json({updatedBrouillon})


})
.catch((error)=>{
 return res.status(400).json({error})
})
}
}}



const destroy=(req, res, next)=>{
    Brouillon.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Brouillon deleted successfully !'}))
    .catch(error => res.status(400).json({ error }));
}


module.exports={
    index,show,store,update,destroy
}