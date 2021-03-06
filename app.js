//setup Dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    port = (process.env.PORT || 8086),
    request = require('request'),
    passport = require('passport'),
    fs = require('fs'),
    logger = require('./libs/utils/logger'),
    pjson = require('./package.json'),
    data = require(__dirname + '/assets/js/data/data.js'),
    db = require('./libs/model/db'),
    companyAPI = require('./libs/api/company').companyAPI,
    userAPI = require('./libs/api/users').userAPI,
    client = require('./libs/api/client'),
    invoice = require('./libs/api/invoice'),
    invoiceItem = require('./libs/api/invoice-item'),
    fee = require('./libs/api/fee'),
    authenticate = require('./libs/api/authentication');

// var logFile = fs.createWriteStream('./logFile.log', {flags: 'a'});
//Setup Express
var server = express();
server.set('views', __dirname + '/views');
server.set('view options', {
    layout: false
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret: "shhhhhhhhh!",
    resave: true,
    saveUninitialized: true
}));
server.use(express.static(__dirname + '/assets'));
// server.use(express.logger({stream: logFile}));
server.use(passport.initialize());
server.use(passport.session());

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
    console.log("creating company");
    var thisCompany = companyAPI.createCompanyObject(req);
    var thisUser = userAPI.createUserObject(req, thisCompany);
    var parentCompanyId = req.body.parentCompanyId || null;

    var newCompany = companyAPI.createCompany(thisCompany, thisUser, parentCompanyId);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(newCompany));
});

server.get('/company/read', function(req, res) {
    var companyId = req.query.companyId || req.body.companyId;

    companyAPI.readCompany(companyId, function(err, company) {

        res.json(company);
    });
});

server.post('/company/update', function(req, res) {
    companyAPI.updateCompany(req.body.companyId, req.body.companyObj, {}, function(err, company) {

        res.json(company);
    });
});

server.delete('/company/delete', function(req, res) {
    console.log("deleting company");
    var isDeleted = companyAPI.deleteCompany(req.body.companyId);
    if(isDeleted) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 'complete', isRemoved: true});        
    };
});

server.get('/client/list', function(req, res) {
    company.getCompanyClients(req.query.companyId, function(err, clients){
        if (err) throw new Error(err);

        res.json(clients);
    });
});

server.get('/client/search', function(req, res) {
    company.searchClients(req.query.companyId, req.query.searchExp, function(err, clients) {
        if(err) throw new Error(err);

        res.json(clients);
    });
});


server.post('/user/create', function(req, res) {
    var thisUser = userAPI.createUserObject(req, req.body.company_id);

    userAPI.createUser(thisUser, function(err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    });
});

server.get('/user/read', function(req, res) {
    userAPI.readUser(req.query.userId, function(err, user) {
        if (err) {
            console.log(err);
        }

        console.log(user);
        res.json(user);
    });
});

server.post('/user/update', function(req, res) {
    userAPI.updateUser(req.body.userId, req.body.userObj, req.body.options, function(err, user) {
        if (err) {
            console.log(err)
        }

        res.json(user);
    });
});

server.delete('/user/delete', function(req, res) {
    var isDeleted = userAPI.deleteUser(req.body.userId);

    if (isDeleted) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 'complete', isRemoved: true, message: 'The user has been successfully removed'});
    }
});

server.get('/user/search', function(req, res) {
    var users = userAPI.searchUsers(req.query.companyId, req,query.searchExp);

    if (users) {
        res.json(users);
    }
});

server.get('/users/search', function(req, res) {
    // user.searchUsers(req.query.companyId, req.query.searchExp).exec(function(err, searchResults) {
    //     if (err) return console.log(err);
    //     res.json(searchResults);
    // });
});

server.get('/users/company', function(req, res) {
    // user.getUsers(req, res).exec(function(err, users) {
    //     if (err) return console.log(err);

    //     res.json(users);
    // });
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


logger.log('info', 'Listening on http://localhost: %s', port);