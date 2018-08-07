const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String

})
module.exports = mongoose.model('Movie', movieSchema);