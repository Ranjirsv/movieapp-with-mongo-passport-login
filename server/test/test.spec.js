var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');


var model = require('../models/movie.js');
var model1 = require('../models/users.js');

var app = require('../index.js');

var moviecontroller = require('../controller/moviecontroller');
var address = request("http://localhost:5000")
var modelStub = sinon.stub(model, 'find');
var modelStub1 = sinon.stub(model1, 'find');

describe('Testing moviecontroller', function(err) {

    describe('Find movies in favourite list', function(err) {
        beforeEach(function() {
            modelStub.yields(null, [{
                'title': 'irumugan',
                'username' : 'kavi'
            }]);
        });

        it('find movie in the favourite list', function(done) {
            address
                .get('/viewFav')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

                    if (err) return done(err);
                    //console.log(res.body[0].title);
                    expect(res.body[0].title).to.be.equal('irumugan');
                    done();
                });
        });
    });

});
describe('Test my authenticationcontroller', function(err) {

    describe('Find signup details', function(err) {
        beforeEach(function() {
            modelStub1.yields(null, [{
                'username': 'sasi'
            }]);
        });

        it('should match the signup details', function(done) {
            address
                .post('/signup')
                .expect(302)
                
                .end(function(err, res) {

                    if (err) return done(err);
                      
                    done();
                });
        });
    });

});