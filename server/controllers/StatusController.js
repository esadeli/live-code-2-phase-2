'use strict'

const Status = require('../models/status')

class StatusController{

    // create status
    static createStatus(req,res){
        Status.create({
            content: req.body.content,
            userid: req.decoded.userid,
            usernamestatus: req.decoded.name
        })
        .then(status =>{
            res.status(200).json({
                msg: 'Status created',
                data: status
            })
        })
        .catch(error =>{
            res.status(500).json({
                msg: 'ERROR: ',error
            })
        })
    }

    // get lists of all status
    static getAllStatus(req,res){
        Status.find({})
          .then(statuslist =>{
              res.status(200).json({
                  msg: 'List of status',
                  data: statuslist
              })
          })
          .catch(error =>{
              res.status(500).json({ msg: 'ERROR: ',error})
          })
    }
}

module.exports = StatusController
