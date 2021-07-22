const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const { isEmail } = require('validator');

const profileSchema = new Schema({

    firstname: {
        type: String,
        required: [true, 'please enter your First name']
    },

    email: {
        type: String,
        required: [true, 'please enter your Email'],
        lowercase: true,
        unique: true,
        validate: [ isEmail, 'Please enter a valid Email']
    },

    password: {
        type: String,
        required: [true, 'please enter a Password'],
        minlength: [6, 'Password needs to be atleast 6 characters']
    }

});

//-------------- HASHING THE PASSWORD---------------

profileSchema.pre('save', async function (next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, 10)
    next();
});

//--------------- LOGIN USER---------------------

profileSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
       const auth = await bcrypt.compare(password, user.password)
       
       if(auth) {
       return user;
    }
    throw Error('incorrect password')
    }
    throw Error('incorrect email')


}

const Profile = mongoose.model('user-profile', profileSchema);

module.exports = Profile;