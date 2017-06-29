/*schema file for signup details*/
var mongoose = require('mongoose');


var Schema = mongoose.Schema({
    firstname: String,
    
    lastname: String,
    
    username: String,

    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
});


var MyModel = mongoose.model('user', Schema);
module.exports = MyModel;