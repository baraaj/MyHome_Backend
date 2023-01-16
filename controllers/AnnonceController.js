const Annonce=require('../Models/Annonce');
const fs=require('fs')
const multer=require('multer')
const path=require('path');
var ObjectId = require('mongodb').ObjectId;
var a=[];


const index=(req,res,next)=>{
    Annonce.find()

.then((a)=>{
  
  res.status(200).json(a)
})
.catch((error)=>{
 return res.status(400).json({error})
})
}


const show=(req, res, next)=>{
   
        Annonce.findOne({ _id: req.params.id })
          .then(Annonce => res.status(200).json(Annonce))
          .catch(error => res.status(404).json({ error }));
}


const store=(req,res,next)=>{
    let cl=new Annonce();
    // eslint-disable-next-line no-lone-blocks
    {if(req.file && req.file.originalname)
        {cl=new Annonce({...req.body,Logo:req.file.filename}, { strict: false });
       }
        else{cl=new Annonce({...req.body}, { strict: false });
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
    {const updatedAnnonce={
        Titre:req.body.Titre,
        Description:req.body.Description,
        Image:req.file.filename
    };
    Annonce.findByIdAndUpdate(
        req.params.id,
        {$set:updatedAnnonce},
        {new:true}
    ).then((a)=>{
        return res.status(203).json({updatedAnnonce})
 
 
    })
    .catch((error)=>{
     return res.status(400).json({error})
    })
}
else{
  {const updatedAnnonce={
    Titre:req.body.Titre,
    Description:req.body.Description,
    Image:req.file.filename
   
};
Annonce.findByIdAndUpdate(
    req.params.id,
    {$set:updatedAnnonce},
    {new:true}
).then(()=>{
    return res.status(203).json({updatedAnnonce})


})
.catch((error)=>{
 return res.status(400).json({error})
})
}
}}


//delete Annonce by id
const destroy=(req, res, next)=>{
    Annonce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Annonce deleted successfully !'}))
    .catch(error => res.status(400).json({ error }));
}


module.exports={
    index,show,store,update,destroy
}