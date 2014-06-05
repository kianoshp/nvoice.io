var mongoose = require('mongoose'),
    chai = require('chai'),
    request = require('supertest'),
    db = require('../../../libs/model/db'),
    Company = require('../../../libs/model/company'),
    User = require('../../../libs/model/user'),
    company = require('../../../libs/api/company'),
    app = require('../../../app'),
    express = require('express');

describe('Company API test', function() {
    var companyObj = {
        company: {
            companyName : "Cielo Concepts Inc.",
            phone : 7810000000,
            email : "kianoshp@cieloconcpets.com",
            address : {
                address1 : "70 Paul Gore Street",
                address2 : "Unit 2",
                city : "Jamaica Plain",
                state : "MA",
                country : "United States",
                zip : "02130"
            }       
        },
        user: {
            firstName : "Kianosh",
            middleInitial : "",
            lastName : "Pourian",
            password : "pa$$w0rd",
            email : "kianoshp@gmail.com",
            phone : "7819623739",
            role : "administrator",
            mainContact : true        
        }   
    },
    currentCompanyId,
    app = express();

    describe("CRUD process", function() {

        describe('Create', function() {
            it('should create a company', function() {
                
                var thisCompany = new Company(companyObj.company);

                thisCompany.save(function(err) {
                    if (err) return console.log(err);
                    currentCompanyId = thisCompany._id;
                    console.log('1. currentCompanyId --> ' + currentCompanyId);
                    Company.findById(thisCompany, function(err, doc) {
                        if (err) return console.log(err);
                        chai.expect(doc).to.exist;
                        chai.expect(doc.companyName).to.equal(companyObj.company.companyName);
                        // currentCompanyId = doc._id;
                    });

                });
            });
        });

        describe('Read', function() {
            it('should read a company', function() {
                console.log('2. currentCompanyId --> ' + currentCompanyId);
                Company.findById(currentCompanyId, function(err, doc) {
                    if(err) return console.log(err);
                    console.log(doc);
                    chai.expect(doc).to.exist;
                });

            });
        });

        // it('should update a company', function() {

        // });

        // it('should delete a company', function() {

        // });
    });
});