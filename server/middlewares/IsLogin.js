'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function IsLogin(req,res,next){

    jwt.verify(req.headers.token, process.env.SECRETTOKEN, (err,decoded)=>{
        let objdecoded = decoded
        if(!err){
            
            User.findOne({ _id: objdecoded.userid })
                .then(user =>{
                    if(user){
                        req.decoded = objdecoded
                        next()
                    }else if(user===null){
                        res.status(403).json({ msg: 'You are not authorized'})     
                    }
                })
                .catch(error =>{
                    res.status(500).json({ msg: 'ERROR: ',error})
                })
        }else{
            res.status(403).json({ msg: 'TOKEN ERROR: You are not authorized'})
        }
    })
}

module.exports = IsLogin