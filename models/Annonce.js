const mongoose=require('mongoose');
const Schema=mongoose.Schema
const opts = { toJSON: { virtuals: true } };
const annonceschema=new Schema({
    Description:{
        type: String,
        trim:true,
    },

    Titre:{  
        type: String,
        trim:true,
    },
    Image:{  
        type: String,
        trim:true,
    },
    Email:{
        type: String,
        trim:true,
    },
    Tel:{
        type: String,   
        trim:true,
    }
    
},opts)
module.exports=mongoose.model('Annonce',annonceschema);