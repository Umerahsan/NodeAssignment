const mongoose= require('mongoose');
var Schema= mongoose.Schema;

var userSchema=new Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    emailId:String

})
module.exports = mongoose.model('User',userSchema);