//setup Dependencies
var express = require('express'),
    port = (process.env.PORT || 8086),
    request = require('request'),
    passport = require('passport'),
    fs = require('fs'),
    logger = require('./libs/utils/logger'),
    pjson = require('./package.json'),
    data = require(__dirname + '/assets/js/data/data.js'),
    db = require('./libs/model/db'),
    company = require('./libs/api/company'),
    user = require('./libs/api/users'),
    client = require('./libs/api/client'),
    invoice = require('./libs/api/invoice'),
    invoiceItem = require('./libs/api/invoice-item'),
    fee = require('./libs/api/fee'),
    authenticate = require('./libs/api/authentication');

// var logFile = fs.createWriteStream('./logFile.log', {flags: 'a'});
//Setup Express
var server = express();
server.configure(function() {
    server.set('views', __dirname + '/views');
    server.set('view options', {
        layout: false
    });
    server.use(express.urlencoded());
    server.use(express.json());
    server.use(express.cookieParser());
    server.use(express.session({
        secret: "shhhhhhhhh!"
    }));
    server.use(express.static(__dirname + '/assets'));
    // server.use(express.logger({stream: logFile}));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(server.router);
    server.use(function(err, req, res, next) {
        if (err instanceof NotFound) {
            res.render('404.jade', {
                title: '404 - Not Found',
                description: '',
                author: '',
                analyticssiteid: 'XXXXXXX',
                status: 404
            });
        } else if (err) {
            console.log(err);
            console.log("I am going to show 500.jade");
            res.render('500.jade', {
                title: 'The Server Encountered an Error',
                description: '',
                author: '',
                analyticssiteid: 'XXXXXXX',
                error: err,
                status: 500
            });
        }
    });
});

server.listen(port);

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////
server.get('/', function(req, res) {
    res.render('index.jade', {
        title: 'Generic title will go here',
        description: 'Describe what you are doing',
        author: pjson.author,
        analyticssiteid: 'XXXXXXX'
    });
});

server.post('/login', function(req, res, next) {
    return passport.authenticate('local', function(err, user, info) {
        var resObj = {
            success: true
        }

        if (!user) {
            //did not authenticate
            console.log('could not authenticate. Here is the info returned -- > ');
            console.log(info);
            resObj = {
                errorCode: 401,
                errorMsg: info.message,
                success: false
            }
            return res.send(resObj);
        }

        return req.login(user, function() {
            console.log('user is --> ');
            console.log(user);
            res.send(resObj);
        });
        /*  {
    successRedirect: '/'
    , failureRedirect: '/login'
  }
*/
    })(req, res, next);
});


server.post('/company/create', function(req, res) {
    var thisCompany = company.createCompany(req, res);

    if (req.body.isClient) {
        client.addClientToCompany(req.body.parentCompany, thisCompany.company._id);
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(thisCompany));
});

server.del('/company/delete', function(req, res) {
    var isDeleted = company.deleteCompany(req, res);
    if(isDeleted) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 'complete', isRemoved: true});        
    };
});

server.get('/client/list', function(req, res) {
    client.getClients(req, res);
});

server.get('/client/search', function(req, res) {
    client.searchClients(req, res);
});

server.post('/users/create', function(req, res) {
    company.CompanySchema.findOne({
        _id: req.body.company_id
    }, function(err, company) {
        if (err) logger.log('debug', err);
        logger.log('info', 'I found the company I was looking for --> %j', company);
        req.body.companyId = company._id;
        user.post(company);
        res.send();
    });
});

server.post('/users/edit', function(req, res) {
    user.editUser(req, res);
});

server.get('/users/search', function(req, res) {
    user.searchUsers(req.query.companyId, req.query.searchExp).exec(function(err, searchResults) {
        if (err) return console.log(err);
        res.json(searchResults);
    });
});

server.get('/users/company', function(req, res) {
    user.getUsers(req, res).exec(function(err, users) {
        if (err) return console.log(err);

        res.json(users);
    });
});

server.post('/invoice/create', function(req, res) {
    invoice.createInvoice(req, res);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end();
});

server.post('/invoice-item/create', function(req, res) {
    invoiceItem.addInvoiceItem(req, res);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end();
});

server.post('/invoice/fee', function(req, res) {
    fee.addFeeToInvoice(req, res);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end();
});

server.get('/jasmineTest', function(req, res) {
    fs.readFile(__dirname + '/assets/test/SpecRunner.html', 'utf8', function(err, text) {
        res.send(text);
    });
});

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res) {
    throw new NotFound;
});

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


logger.log('info', 'Listening on http://localhost: %s', port);