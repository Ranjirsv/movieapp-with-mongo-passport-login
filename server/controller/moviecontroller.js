let request = require('request');
var movies = require('../models/movie');
module.exports = {
// method for search
    search: function(req, res) {
        request.get('https://api.themoviedb.org/3/search/movie?api_key=3d34e72c9badeb4e4254c09ec0109d8e&language=en-US&query=' + req.query.name + '&page=1&include_adult=false', function(err, response, body) {

//if no error and statuscode is 200, then it will send response
 
            if (!err && response.statusCode === 200) {

                res.send(response.body);

            } else {
                res.send('error occured in route');
            }
        });
    },


// add favourite movie method

    addFav: function(req, res) {
        console.log('enterAdd');
        
// title, posterpath and releasedate are added in add object        
        var data = JSON.parse(req.body.value);
        var add = {
            Title: data.Title,
            Poster: data.Poster,
            Release_Date: data.Release_Date,
            username : req.body.username
        };
        
// add object is insert into db        
        console.log(add);
        var db = new movies(add);
        db.save(function(err, db) {
            if (err) {
                res.send(err);
            } else {
                res.send("Success");
            }
        });
    },
    
    
 // view favourite movie method   

    viewFav: function(req, res) {
        movies.find({"username":req.query.username},function(err, data) {
            if (err) throw err;
            else {
                res.send(data);
            }

        });
    },


// delete method for deleting data in db

    deleteFav: function(req, res) {
        console.log('enterrr delettte');
        var title = req.query.Title;

// remove method for removing doc in db
console.log(title);
        movies.remove({
            Title: title,
            username: req.query.username
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.send("success");
            }
        });
    }

};