/**
 * Main Server File
 * Handles dependencies, routes, and server configs
 * Created by: bgjoni 10/10/15
 */

// Dependecies
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
//var server = http.createServer(app);
var eps = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Config File
config = require('./config.js').get(process.env.NODE_ENV);
//Logging using Morgan and winstom
require('./resources/logging.js');
var ip = require('ip');
hostIP = ip.address();
logger.info("Host application running on" + ip.address());
var morgan = require('morgan');
morgan.token('appName', function(req, res) {
    return "BEACH|SECURITY_AUDIT|"
});
morgan.token('hostIP', function(req, res) {
    var firstname = req.headers.firstname;
    var lastname = req.headers.lastname;
    var msid = req.headers.msid;
    if (firstname === undefined) {
        return hostIP;
    }
    return hostIP + "|" + firstname + "," + lastname+ "," + msid;
});

morgan.token('basicInfo', function(req, res) {
    var basicInfoTemplate = {
        "memberId": "",
        "groupId": "",
        "requestInfo":""
    };
    var memberId = req.headers.memberid;
    if(memberId === undefined){
        memberId ="";
    }
    var groupId = req.headers.groupid;
    if(groupId === undefined){
        groupId = " ";
    }
    basicInfoTemplate.memberId = memberId;
    basicInfoTemplate.groupId = groupId;
    basicInfoTemplate.requestInfo = req.body;
    return " BasicInfo : " + JSON.stringify(basicInfoTemplate);
});

app.use(morgan(":appName:remote-addr|:hostIP|:method|:url HTTP/:http-version|:status| " +
    ":res[content-length]- :response-time ms |:basicInfo ", { stream: logger.stream }));

// ejs engine for dynamic templates
app.engine('html', require('ejs').renderFile);

// Public Folder initialization
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// console.log(config.environment);

// L7tokenGen
var L7tokenGen = require('./resources/layer7tokenGenerator.js');
//global variable
L7Token = "";

var l7tokencheck = function() {
    //clear old interval
    clearInterval(tokenInterval);
    // update/get token
    L7tokenGen.tokenGen(encrClientID, encrClientSec).then(function(result) {
        L7Token = result;
        logger.info(">>> new layer7 token issued: " + L7Token.access_token + " >>>");
        logger.info(">>> new layer7 token expiration: " + L7Token.expires_in + " >>>");
        tokenInterval = setInterval(l7tokencheck, L7Token.expires_in * 1000);
    }).catch(function(ex) {
        logger.error('<<< get layer7 token ' + JSON.stringify(ex) + ' <<<');
        tokenInterval = setInterval(l7tokencheck, 5000);
    });
};
//Initial interval
//var tokenInterval = setInterval(l7tokencheck, 10);


// MongoDB ClientId/Sec
var mongoConfigFile = require('./resources/mongoDBconfig.js');
var encrClientID = null;
var encrClientSec = null;
var tokenInterval = null;
mongoConfigFile.mongoConnect(function(dbConnection) {
    // var collection = dbConnection.collection('TEST');
    var collection = dbConnection.collection(config.MONGODB_COLLECTION_TOKEN);
    mongoConfigFile.getAllDocuments(collection, function(appInfo) {
        encrClientID = appInfo[0].token.client_id;
        encrClientSec = appInfo[0].token.client_secret;
        tokenInterval = setInterval(l7tokencheck, 10);
    }); // end mongo get all
}); // end mongo connect


// Routes
//var routes = require('./resources/routes.js');
var indexRoutes = require('./routes/index');
var memberRoutes = require('./routes/member');
var groupRoutes = require('./routes/group');
var linkRoutes = require('./routes/quicklinks');

if (process.env.NODE_ENV === 'offline') {
    var offlineRoutes = require('./routes/offline');
    app.use('/', indexRoutes);
    app.use('/', offlineRoutes);
    app.use('/quicklinks', linkRoutes);
} else {
    app.use('/', indexRoutes);
    app.use('/member', memberRoutes);
    app.use('/group', groupRoutes);
    app.use('/quicklinks', linkRoutes);
}

//To test Mongodb connection and status of token
app.get('/getMongodb', function(req, res) {

    if (encrClientID != null && encrClientSec != null) {
        res.send({ "success": "true" });
    } else {
        res.send({ "success": "false" });
    }
});

// DO NOT TOUCH anything below this line.


var port = process.env.PORT || 8080,
    ip = process.env.IP || '0.0.0.0';

app.listen(port, ip);
logger.info('--- Server running on http://%s:%s', ip, port);
// console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
module.exports.token = function(callback) {
    callback(L7Token);
};

// DO NOT TOUCH
