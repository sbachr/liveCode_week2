const mongoose = require('mongoose')
const Schema = mongoose.Schema


const quoteSchema = new Schema({

    quote : {
        type : String,
        required : `Please Input Your Quote`
    },

    userId : [{ type : Schema.Types.ObjectId, ref : 'User' }]
}, {timestamps : true})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote