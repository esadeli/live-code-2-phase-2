var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  username: String,
  email: String,
  password:   String
},{
    timestamps: true
});

const User = mongoose.model('User',UserSchema)

module.exports = User