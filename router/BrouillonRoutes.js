const express=require('express')
const router=express.Router()
const BrouillonController=require('../Controllers/BrouillonController')
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

router.get('/',BrouillonController.index)
router.get('/show/:id',BrouillonController.show)
router.post('/store',upload,BrouillonController.store)
router.put('/update/:id',upload,BrouillonController.update)
router.delete('/delete/:id',BrouillonController.destroy)




module.exports =router