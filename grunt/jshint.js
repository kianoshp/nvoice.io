module.exports = {
<<<<<<< HEAD
    all: ['libs/**/*.js', 'Gruntfile.js'],
    // configure JSHint (documented at http://www.jshint.com/docs/)
    options: {
        // more options here if you want to override JSHint defaults
        node: true,
        strict: false
    }
=======
  all: ['libs/**/*.js', 'Gruntfile.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
  options: {
    // more options here if you want to override JSHint defaults
    node: true,
    strict: false,
    laxcomma: true
  }
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
};