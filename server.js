// NewRelic ================================================
require('newrelic');

// includes ================================================
ingredientsBusiness = require('./app/lib/business/ingredients');

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
if (process.env.NODE_ENV == 'production') {
    var db = require('./config/db').production;
    var prodPort = 80;
} else {
    var db = require('./config/db').development;
}

var port = process.env.PORT || prodPort || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
// pass our application into our routes
require('./app/routes/ingredients')(app);
require('./app/routes/recipes')(app);
require('./app/routes/index')(app);

// start app ===============================================
app.listen(port);	
console.log('Decide running on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app