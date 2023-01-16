const express=require('express')
const router=express.Router()
const AnnonceController=require('../Controllers/AnnonceController')
const multer = require('multer');
const images = multer({dest: '../images/'})
const path=require('path');
const Storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null,Date.now()+'_'+name);
  }
});
const upload=multer({storage:Storage}).single('Image')

router.get('/',AnnonceController.index)
router.get('/show/:id',AnnonceController.show)
router.post('/store',upload,AnnonceController.store)
router.put('/update/:id',upload,AnnonceController.update)
router.delete('/delete/:id',AnnonceController.destroy)




module.exports =router