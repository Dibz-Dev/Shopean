const Profile = require('../models/Profile');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken')
require('dotenv').config();




//-------------------- HANDLE ERRORS---------------------

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

// duplicate errors

if(err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
}

// INCORRECT EMAIL

if(err.message === 'incorrect email') {
    errors.email = 'This email is not registered'
}

// INCORRECT PASSWORD

if(err.message === 'incorrect password') {
    errors.password = 'your password is incorrect'
}


// Validation errors

if(err.message.includes('user-profile validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;

    });
}
return errors;

}
// -------------JWT-----------------------

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn: maxAge 
    });
} 
module.exports.home_post = (req, res) => {
    
    const item =  new Item(req.body)
    
    item.save()
    .then((result) => {
        res.redirect('home')
    }).catch((err) => console.log(err))
    
   
    }

    module.exports.getItem_get = async (req, res) => {
    

        try {
                const items = await Item.find({},'item category -_id')
                 res.json(items)
                 console.log(items)
                 
        } catch (err) {
                res.status(500).json({ message: err.message})
                } 
    }


 module.exports.cover_get = (req, res) => {
        res.render('cover') }

 
module.exports.home_get = (req, res) => {
    res.render('index') }
   
module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const { firstname, email, password } = req.body;

    try {
     const profile = await Profile.create({ firstname, email, password })
     const token = createToken(profile._id)
     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
     res.status(201).json({ profile: profile._id});
    

    }
    catch (err) {
     const errors = handleErrors(err)
      res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

  try {
   const profile = await Profile.login(email, password)
   const token = createToken(profile._id)
   res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
   res.status(200).json({ profile: profile._id})
  }
  catch (err) {
      const errors = handleErrors(err);
    res.status(400).json({ errors })
  }

}

module.exports.logout_get = (req, res) => {

   res.cookie('jwt', '', { maxAge: 1 })
   res.redirect('/login');

}
