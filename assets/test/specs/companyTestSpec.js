var mongoose = require('mongoose'),
    chai = require('chai'),
    superagent = require('superagent');

describe('Company API test', function() {
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
        currentCompanyId
        ;

    describe("CRUD process", function() {

        describe('Create', function() {
            it('should create a company', function(done) {

                superagent.post('http://localhost:8086/company/create')
                    .send(companyObj)
                    .end(function(err, res) {
                        if (err) return console.log(err);

                        companyObject = res.body.company;
                        currentCompanyId = companyObject._id;
                        chai.expect(companyObject).to.exist;
                        chai.expect(companyObject).to.not.be.undefined;
                        chai.expect(companyObject.companyName).to.equal(companyObj.company.companyName);
                        done();
                    });
            });

            it('should create a client', function(done) {
                clientObj.parentCompany = companyObject._id;
                superagent.post('http://localhost:8086/company/create')
                    .send(clientObj)
                    .end(function(err, res) {
                        if (err) return console.log(err);

                        var clientObject = res.body.company;
                        // currentCompanyId = clientObject._id;
                        chai.expect(clientObject).to.exist;
                        chai.expect(clientObject).to.not.be.undefined;
                        chai.expect(clientObject.companyName).to.equal(clientObj.company.companyName);
                        done();
                    });
            });
        });

        describe('Delete', function() {
            it('should delete a company and all associated clients and users', function() {

                superagent.del('http://localhost:8086/company/delete')
                    .send({companyId: currentCompanyId})
                    .end(function(err, res) {
                        if(err) return console.log(err);

                        chai.expect(res.body).to.exist;
                        chai.expect(res.body.status).to.equal('complete');
                        chai.expect(res.body.isRemoved).to.be(true);
                    });
            });
        });

        // it('should update a company', function() {

        // });

        // it('should delete a company', function() {

        // });
    });
});