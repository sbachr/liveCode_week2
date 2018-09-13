const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
require('dotenv').config()
app.use(cors())

const RouterIndex = require('./routes/routesIndex')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/live-code-phase2');

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
    console.log('Data base runing....');
});

app.use(express.urlencoded({ extended : false}))
app.use(express.json())

app.use('/', RouterIndex)


app.listen(port, ()=> console.log(`Server running at port ${port}`))