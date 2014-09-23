var mongoose = require('mongoose'),
    chai = require('chai'),
    superagent = require('superagent');

describe('User API test', function() {
    var URL = 'http://localhost:8086';
    var userObj = {
        firstName: "Magdalene",
        middleInitial: "",
        lastName: "Pourian",
        password: "pa$$w0rd",
        email: "kianoshp+1@gmail.com",
        phone: "7819623739",
        role: "invoiceCreator",
        mainContact: false
    },
    userObj2 = {
        firstName: "Maral",
        middleInitial: "",
        lastName: "Pourian",
        password: "pa$$w0rd",
        email: "kianoshp+2@gmail.com",
        phone: "5088264781",
        role: "invoiceCreator",
        mainContact: false
    },    
    companyObj = {
        company: {
            companyName: "Cielo Concepts Inc.",
            phone: 7810000000,
            email: "kianoshp@cieloconcpets.com",
            address: {
                address1: "70 Paul Gore Street",
                address2: "Unit 2",
                city: "Jamaica Plain",
                state: "MA",
                country: "United States",
                zip: "02130"
            }
        },
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
    },
    modifiedUserObj = {
        firstName: "Magdalene",
        middleInitial: "Laleh",
        lastName: "Pourian",
        password: "pa$$w0rd",
        email: "kianoshp+1@gmail.com",
        phone: "5080000000",
        role: "invoiceCreator",
        mainContact: false
    };

    describe("CRUD process", function() {

        describe('Create', function() {
            it('should create a primary company and its user', function(done) {
                done();
            });

            it('should be able to create an user under a company', function(done) {
                done();
            });

            it('should be able to create another user under a company', function(done) {
                done();
            });
        });

        describe('Read', function() {
            it('should be able to read an user', function(done) {
                done();
            });
        });

        describe('Update', function() {
            it('should be able to update an user', function(done) {
                done();
            });
        });

        describe('Search users', function() {
            it('should be able to search for users under a company', function(done) {
                done();
            })
        });

        describe('Delete', function() {
            it('should be able to delete an user that is not the main contact', function(done) {

            });

            it('should delete a company and all associated clients and users', function(done) {
                done();
            });
        });
    });
});