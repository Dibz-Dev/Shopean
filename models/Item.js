const mongoose = require('mongoose')
const Schema = mongoose.Schema


const itemSchema = new Schema({

    item: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('shopping-item', itemSchema);

module.exports = Item;