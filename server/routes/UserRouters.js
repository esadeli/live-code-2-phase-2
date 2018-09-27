'use strict'

const express = require('express')
const router = express.Router();
const UserController = require('../controllers/UserController')

// register
router.post('/register',(req,res)=>{
    UserController.userRegister(req,res)
})

// login
router.post('/login',(req,res)=>{
    UserController.userLogin(req,res)
})

module.exports = router