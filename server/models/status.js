var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
  content:  String,
  userid: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  usernamestatus: {
      type: String
  }  
},{
    timestamps: true
});

const Status = mongoose.model('Status',StatusSchema)

module.exports = Status