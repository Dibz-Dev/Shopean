
const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { pageAuth, displayUser } = require('./authMiddle/pageAuth');
const Item = require('./models/Items');
require('dotenv').config();


// ----------- SCHEMA MODELS-----------



const app = express()

const dbURI = process.env.API_KEY;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then((result) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err))



// ---------ENGINE--------------
app.set('view engine', 'ejs');




// ---------MIDDLEWARE----------

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(cookieParser());



// ----------- ROUTES ------------
app.get('*', displayUser);
const getItem = async (req, res, next) => {
    let item
    try {
        item = await Item.find(req.body.item);
        if (item == null) {
            return res.status(404).json({message: 'no item found, please create one'})
        }

    } catch (err) {
        res.status(400).json({message: err.message})
    }
    res.item = item;
    next()
}



app.get('/home', pageAuth, getItem, (req, res) => { 
    
    res.render('index') })




app.use(authRoutes);




app.use((req, res) => {
    res.render('404')
})







 
