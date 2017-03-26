var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds143000.mlab.com:43000/photo_app');

var schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', schema);
