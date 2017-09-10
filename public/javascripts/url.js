var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var urlSchema = new Schema({
    original_url: String,
    short_url: String
});

var modelClass = mongoose.model('shortUrl', urlSchema);

module.exports = modelClass;