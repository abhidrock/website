var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());

//Set up mongoose connection
//this code creates the default connection to the database and binds to the error event (so that errors will be printed to the console).
var mongoose = require('mongoose');
var mongoDB = 'mongodb://susilpanda:website@ds155577.mlab.com:55577/website'; // connect to our database
mongoose.connect(mongoDB, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var User = require('./models/user');
var Blog = require('./models/blog');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//var port = process.env.PORT || 8081;        // set our port
// router.use(bodyParser.json());

var index = require('./routes/index');
var users = require('./routes/users');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
//app.use('/', index);
/*
app.use('/users', users);
// We will also add next() to indicate to our application that it should continue to the other routes.
// This is important because our application would stop at this middleware without it.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
});

var data = {first_name : "john",
    last_name: "travolta",
    email_id : "john@gmail.com",
    password : "password",
    date_of_birth : "11-10-1980",
    is_admin : false};

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')
    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function (req, res) {
        console.log("I got a get all Request");
        User.find(function (err, users) {
            if(err)
                res.send(err);
            res.json(users);
        })
    });

// more routes for our API will happen here
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

    // get a specific user by id
    .get(function (req, res) {
        console.log("I got a get Request");
        User.findById(req.params.user_id, function (err, user) {
            if(err)
                res.send(err);
            res.json(user);
        })
    })

    // update a user by its id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function (req, res) {
        console.log("Got a put request");
        console.log(req.body);
        //const update = updated = _.assign({ "updatedAt": new Date() }, req.body);
        User.update({_id:req.params.user_id}, req.body, function (err) {
            if (err) res.send(err);//return next(err);
            res.json({message : "User updated successfully"});
        });
        /*User.findByIdAndUpdate(req.params.user_id, req.body, function (err, user) {
            if (err) res.send(err);//return next(err);
            res.json(user);
        });*/
    })
    
    // delete a user by its id
    .delete(function (req, res) {
        console.log("Got a delete request");
        User.remove({_id : req.params.user_id}, function (err, user) {
            if (err)
                res.send(err);
            res.json({message: "User deleted successfully"})
        })
    });

router.route('/register')

    // create a user (accessed at POST http://localhost:8080/api/register)
    .post(function(req, res){
    console.log("I got a register Request");
    console.log(req.body);

    User.create(req.body, function (err) {
        if(err){
            res.send(err);
        }
        res.json({message : "user created"});

    });
});

// Added routes for Blog GET, PUT and DELETE
router.route('/users/:user_id/blogs/:blog_id')
    .get(function (req, res) {
       Blog.findById(req.params.blog_id, function (err, blog) {
      /* Blog.find({_id : req.params.blog_id, user : req.params.user_id}, function(err, blog) {*/
            if(err)
                res.send(err);
            res.json(blog)
        })
    })
    .put(function (req, res) {
        Blog.update({_id:req.params.blog_id}, req.body, function (err, blog) {
            if(err)
                res.send(err);
            res.json(blog);
        })
    })
    .delete(function (req, res) {
        Blog.remove({_id: req.params.blog_id}, function (err, blog) {
            if(err)
                res.send(err);
            res.json({status : "blog removed"})
        })
    });

// create blog
router.route('/users/:user_id/blogs')
    .post(function (req, res) {
        console.log("Got a blog create request");
        Blog.create(req.body, function (err, blog) {
            if(err)
                res.send(err);
            res.json(blog);
        })
    })
    // Get all blogs for a user
    .get(function (req, res) {
        // added criteria
        Blog.find({user : req.params.user_id}, function (err, blog) {
            if(err)
                res.send(err);
            res.json(blog);
        })
    });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
//app.listen(port);
//console.log('website starts on port ' + port);
module.exports = app;
