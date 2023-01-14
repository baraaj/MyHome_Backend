const express=require('express')
const PORT=3000
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
c
const path = require('path');
const morgan=require('morgan');

app.use(bodyParser.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
mongoose.connect('mongodb+srv://admin:admin@cluster0.cfz5sby.mongodb.net/?retryWrites=true&w=majority',{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
       console.log('Connexion Success');
}).catch((error)=> {
    console.log(error);
});
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/clubs',RouteClubs);
app.use('/api/auth',userRoutes);
app.use('/api/news',newsRoutes);
app.use('/api/events',eventsRoutes);
app.use(cors({origin:'http://localhost:3000'}));
app.use('/uploads',express.static('uploads'));
app.use('/uploadsevent',express.static('uploadsevent'));
app.use('/uploadsnews',express.static('uploadsnews'));
//app.use(morgan('dev'));

module.exports=app;