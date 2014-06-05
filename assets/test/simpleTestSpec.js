var expect = require('chai').expect;

/*
* This is just a simple setup for the unit testing just to be used as an example
* a more complex setup will be added soon.
*/
describe('Simple Test', function(done) {
    describe('Math test', function(done) {
        it('should run this math problem correctly', function() {
            expect(10+9).to.equal(19);
            done();
        })
    });
});