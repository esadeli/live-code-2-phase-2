'use strict'

const express = require('express')
const router = express.Router()
const StatusController = require('../controllers/StatusController')
const IsLogin = require('../middlewares/IsLogin')

// create status
router.post('/',IsLogin,(req,res)=>{
    StatusController.createStatus(req,res)
})

// get list of all status
router.get('/list',(req,res)=>{
    StatusController.getAllStatus(req,res)
})

module.exports = router
