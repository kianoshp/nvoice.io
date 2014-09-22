var mongoose = require('mongoose'),
    chai = require('chai'),
    superagent = require('superagent');

describe('Company API test', function() {
    var URL = 'http://localhost:8086';
    var companyObj = {
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
        clientObj = {
            company: {
                companyName: "AMCE Inc.",
                phone: 1230000000,
                email: "wiley.coyote@acme.com",
                address: {
                    address1: "123 Any Street",
                    address2: "Suite 456",
                    city: "Anytown",
                    state: "ST",
                    country: "United States",
                    zip: "12345"
                },
            },
            user: {
                firstName: "Wiley",
                middleInitial: "",
                lastName: "Coyote",
                password: "pa$$w0rd",
                email: "wiley.coyote@acme.com",
                phone: "1234567890",
                role: "administrator",
                mainContact: true
            },
            isClient: true
        },
        companyObject = {},
        currentCompanyId,
        currentClientId,
        modifiedCompanyObj = {
            companyName: "MP2 Technologies",
            phone: 7810000000,
            email: "kianoshp@cieloconcpets.com",
            address: {
                address1: "70 Paul Gore Street",
                address2: "Unit 2014",
                city: "Jamaica Plain",
                state: "MA",
                country: "United States",
                zip: "02130"
            }
        };

    describe("CRUD process", function() {

        describe('Create', function() {
            it('should create a company', function(done) {

                superagent.post(URL + '/company/create')
                    .send(companyObj)
                    .end(function(err, res) {
                        if (err) return console.log(err);

                        companyObject = res.body.companyObj;
                        currentCompanyId = exports.globalCurrentCompanyId = companyObject.company._id;
                        chai.expect(companyObject).to.exist;
                        chai.expect(companyObject).to.not.be.undefined;
                        chai.expect(companyObject.company.companyName).to.equal(companyObj.company.companyName);
                        done();
                    });
            });

        });

        describe("Client Services", function() {
            it('should create a client', function(done) {
                clientObj.parentCompany = companyObject._id;
                superagent.post(URL + '/company/create')
                    .send(clientObj)
                    .send({parentCompanyId: currentCompanyId})
                    .end(function(err, res) {
                        if (err) return console.log(err);

                        var clientObject = res.body.companyObj;
                        currentClientId = clientObject._id;
                        chai.expect(clientObject).to.exist;
                        chai.expect(clientObject).to.not.be.undefined;
                        chai.expect(clientObject.company.companyName).to.equal(clientObj.company.companyName);
                        done();
                    });
            });

        });

        describe('Read', function() {
            it('should be able to read a company', function(done) {
                superagent.get(URL + '/company/read')
                    .query({companyId: currentCompanyId})
                    .end(function(err, res) {
                        if(err) return console.log(err);

                        var thisCompany = res.body;
                        chai.expect(thisCompany).to.exist;
                        chai.expect(thisCompany).to.not.be.undefined;
                        chai.expect(thisCompany.companyName).to.equal(companyObj.company.companyName);
                        done();
                    });
            });

        });

        describe('Update', function() {
            it('should be able to update a company', function(done) {
                superagent.post(URL + '/company/update')
                    .send({
                        companyObj: modifiedCompanyObj,
                        companyId: currentCompanyId
                    })
                    .end(function(err, res) {
                        if(err) return console.log(err);

                        var thisCompany = res.body;
                        chai.expect(thisCompany).to.exist;
                        chai.expect(thisCompany).to.not.be.undefined;
                        chai.expect(thisCompany.companyName).to.equal(modifiedCompanyObj.companyName);
                        chai.expect(thisCompany.address.address2).to.equal(modifiedCompanyObj.address.address2);
                        done();
                    });
            });
        });

        describe('Delete', function() {
            it('should delete a company and all associated clients and users', function(done) {

                superagent.del(URL + '/company/delete')
                    .send({
                        companyId: currentCompanyId
                    })
                    .end(function(err, res) {
                        if (err) return console.log(err);

                        chai.expect(res.body).to.exist;
                        chai.expect(res.body.status).to.equal('complete');
                        chai.expect(res.body.isRemoved).to.be.true;
                        done();
                    });
            });
        });
    });
});