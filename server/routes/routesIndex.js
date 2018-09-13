const Router = require('express').Router()
const User = require('../models/user')
const Quote = require('../models/quotes')
const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config()


// User 

Router

    // register
    .post('/register', (req, res) => {

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                res.status(200).json({
                    msg: `Success create User`,
                    data: user
                })
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    })

    // login
    .post('/login', (req, res) => {

        User.find({
            email: req.headers.email,
            password: req.headers.password
        })
            .then(userData => {

                if (userData.length > 0) {
                    jwt.sign({ email: userData[0].email }, process.env.secretKey, (err, token) => {
                        if (err) res.status(500).json({ msg: err.status })
                        else {

                            res.status(200).json({
                                msg: 'login success',
                                token: token,
                            })
                        }
                    })
                } else {
                    res.status(404).json({
                        message: `Wrong Email or Wrong Password`,
                    });
                }
            })
    })



    // quotes
    .post('/quotes/', (req, res) => {

        Quote.create({
            quote: req.body.quote
        })
            .then(dataQuote => {
                res.status(200).json({
                    msg: `Success create quotes`,
                    data: dataQuote
                })
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    })


    // quote find all
    .get('/quotes', (req, res) => {

        Quote.find()
            .then(dataQuote => {
                res.status(200).json({
                    msg: `Success create quotes`,
                    data: dataQuote
                })
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    })

    // find by user
    .post('/quotes/:id', (req, res) => {
        let where = { _id: req.body.id }

        Quote.find(where)
            .then(dataQuote => {
                res.status(200).json({
                    msg: `Success create quotes`,
                    data: dataQuote
                })
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    })

    // delete quote 
    .delete('/quotes/remove/:id', (req, res) => {
        let where = { _id: req.params.id }

        User.deleteOne(where)
            .then(userData => {

                res.status(200).json({
                    msg: `data has been deleted`,
                    data: userData
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    })

module.exports = Router