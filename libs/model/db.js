var mongoose= require('mongoose');

var dbURI = 'mongodb://localhost/nvoiceDB';
// var dbURI = 'mongodb://appfog:d91fed773bc3ef53d5ab957a7b2b80ea@paulo.mongohq.com:10017/nvoice_me_kianoshp';

mongoose.connect(dbURI);

mongoose.connection.on('error', function(error) {
  console.log('error has occured --> ');
  console.log(error);
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
});

module.exports.Schema = mongoose.Schema;
