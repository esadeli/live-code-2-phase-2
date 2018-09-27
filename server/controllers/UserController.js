'use strict'

const User = require('../models/user')
const HashPassword = require('../helpers/HashPassword')
const jwt = require('jsonwebtoken')
const EmailValidator = require('../helpers/EmailValidator')

class UserController{

    //register
    static userRegister(req,res){
        let hash = HashPassword(req.body.password)
        User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(user =>{
            // console.log('USER REGISTER--->',user)
            jwt.sign({
                userid: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            },process.env.SECRETTOKEN,(error,token)=>{
                res.status(200).json({
                    msg: 'Register sukses',
                    data: token
                })
            })
        })
        .catch(error =>{
            res.status(500).json({ msg: 'ERROR: ',error})
        })
    }

    // login
    static userLogin(req,res){
        let hash = HashPassword(req.body.password)

        // check the input first
        let inputStatus = EmailValidator(req.body.logininput)
        // if email
        if(inputStatus === true){
            User.findOne({ password: hash, email: req.body.logininput})
                .then(user =>{
                    
                    // get jwt token
                    jwt.sign({
                        userid: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },process.env.SECRETTOKEN,(error,token)=>{
                        res.status(200).json({
                            msg: 'Login sukses',
                            data: token,
                            id: user._id,
                            name: user.name,
                        })
                    })
                })
                .catch(error =>{
                    res.status(500).json({ msg: 'ERROR: invalid username/email/password'})
                })
        }else if(inputStatus === false){
            User.findOne({ password: hash, username: req.body.logininput})
                .then(user => {
                    console.log('user---->',user)
                    jwt.sign({
                        userid: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },process.env.SECRETTOKEN,(error,token)=>{
                        res.status(200).json({
                            msg: 'Login sukses',
                            data: token,
                            id: user._id,
                            name: user.name,
                        })
                    })
                })
                .catch(error =>{
                    res.status(500).json({ msg: 'ERROR: invalid username/email/password'})
                })
        }

    }
}

module.exports = UserController