'use strict'

function HashPassword(input){
    const crypto = require('crypto');

    const hash = crypto.createHmac('sha256', process.env.SECRET)
                   .update(input)
                   .digest('hex');
                   
    return hash;               
}

module.exports = HashPassword