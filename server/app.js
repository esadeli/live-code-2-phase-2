'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vwitter', {useNewUrlParser: true})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const UserRouters = require('./routes/UserRouters')

app.use('/users',UserRouters)

app.get('/',(req,res)=>{
    console.log('Base set up')
    res.send('OK')
})

app.listen(process.env.PORT, () => console.log('listening on port 3000'))
module.exports = app