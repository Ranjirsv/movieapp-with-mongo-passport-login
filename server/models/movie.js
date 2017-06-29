// schema for movie db
var mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
    Title: {
        type: String,
        index: true,
        unique: true
    },
    Poster: {
        type: String,
        index: true
    },
    Release_Date: {
        type: String
    }, 
    username : String

});
// movie schema is exported
var movies = module.exports = mongoose.model('movies', movieSchema);