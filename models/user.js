const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    isVerified:Boolean

})
module.exports = mongoose.model('User', userSchema);