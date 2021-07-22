const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');

const pageAuth = (req, res, next) => {
    const token = req.cookies.jwt;
     if (token) {
         jwt.verify(token, 'new zealand is the best country in the world', (err, decodedToken) => {
             if (err) {
                 console.log(err.message);
                 res.redirect('/login');
             } else {
                console.log(decodedToken);
                next();
             }
         })

     } else {
         res.redirect('/login')
     }
}

//--------------------------- DISPLAY USER--------------------

const displayUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new zealand is the best country in the world', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.profile = null;
                next()
            } else {
               console.log(decodedToken);
               let profile = await Profile.findById( decodedToken.id )
               res.locals.profile = profile;
               next()
            }
        })
    } else {
        res.locals.profile = null;
        next()
    }
}

module.exports = { pageAuth, displayUser }  