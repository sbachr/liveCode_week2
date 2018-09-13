const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({

    name: {
        type: String,
        required: `Name must be Input`
    },
    email: {
        type: String,
        required: `Email must be Input`,
        unique: true
    },
    password: String,
},{ timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User