var mongoose = require('mongoose'),
    chai = require('chai'),
    superagent = require('superagent');

describe('User API test', function() {
    var URL = 'http://localhost:8086';
    var userObj = {
        user: {
            firstName: "Kianosh",
            middleInitial: "",
            lastName: "Pourian",
            password: "pa$$w0rd",
            email: "kianoshp@gmail.com",
            phone: "7819623739",
            role: "administrator",
            mainContact: true
        }
    };

    describe("CRUD process", function() {

        describe('Create', function() {
            it('should create a company', function(done) {
                done();
            });
        });

        describe('Read', function() {
            it('should be able to read a company', function(done) {
                done();
            });

        });

        describe('Update', function() {
            it('should be able to update a company', function(done) {
                done();
            });
        });

        describe('Delete', function() {
            it('should delete a company and all associated clients and users', function(done) {
                done();
            });
        });
    });
});