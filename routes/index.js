var express = require('express');
var router = express.Router();
// Admin page
// Status: in Progress

exports.admin = function(req, res) {
    // Logic:
    // If user signs in from mainsite.com/admin -> check headers for user role info
    // if user signs in to mainsite.com and then goes to admin page -> check preset roles from main page.

    var app = require('../server');

    if (typeof(req.headers.group) != "undefined") {
        if (req.headers.group.includes("OSE3")) {
            logger.info('>>> user has Admin Access >>>');
            res.render('admin.html');
        } else {
            logger.info('>>> ACCESS DENIED Admin screen >>>');
            res.send("ACCESS DENIED");
        }

    } else { // no group headers found
        if (typeof(app.get('userRole')) != "undefined") {
            if (app.get('userRole') == 'ADMIN') {
                logger.info('>>> user has Admin Access >>>');
                res.render('admin.html');
            } else {
                logger.info('>>> ACCESS DENIED Admin screen >>>');
                res.send("ACCESS DENIED");
            }
        } else { // This will only happen if running locsally, and going straight to admin page
            res.send("404- no headers found and user role has not been defined");
        }
    }
};


router.get('/', function(req, res){
    res.render('index.html', { firstName: req.headers.firstname, lastName: req.headers.lastname });

});


// Main page user will land on after loging in. (Main search page.)

router.get('/search', function(req, res) {
    // Logic
    // if users signs in to mainsite.com -> check headers for AD group and decide which role to assgin
    // if users is signs in to local env -> pass in generic info
    // no matter what export (set) the user role for use in other routes
    var adminAccessADGroups = config.adminAccessADGroup;
    var memberAccessADGroups = config.memberAccessADGroup;
    var queryParams = req.query;
    function hasAccess(ADGroups){
        for(var i = 0; i < ADGroups.length; i++){
            if(req.headers.group.includes(ADGroups[i])){
                logger.info('>>> user has ADGroups Access >>>');
                return true;
            }
        }
        return false;
    }
    var role = {
        isAdmin: false,
        isMember: false
    };
    var groupDetails = {
      "groupNo": undefined,
      "groupNoBboid": undefined
    };

    if(!isNaN(queryParams.groupNo)){
      groupDetails.groupNo = queryParams.groupNo;
      if(!isNaN(queryParams.benefitBundleOptionId)){
        groupDetails.groupNoBboid = queryParams.benefitBundleOptionId;
      }
    }
    if (typeof(req.headers.group) != "undefined") {
        if (hasAccess(adminAccessADGroups)) {
            role.isAdmin = true;
            logger.info('>>> user has ADMIN Access >>>');
        }
        if(hasAccess(memberAccessADGroups)) {
            role.isMember = true;
            logger.info('>>> user has Member Access >>>');
        }
    }
    else {
        // this is were you would redirect that .uhc link
        req.headers.firstname = "Local";
        req.headers.lastname = "Env";
        req.headers.msid ="msid";
        role = {
            isAdmin: true,
            isMember: true
        }; // carefully with this line, must change later. change to 'User'  to see how it will look disabled.
        logger.info('>>> user has Local env Access Admin and Member >>>');
    }
    var userInformation = {
      firstName: req.headers.firstname,
      lastName : req.headers.lastname,
      msId: req.headers.msid,
      userRole: role
    }
    // Display main page with user info.
    logger.info('>>> Login user Info' + JSON.stringify(userInformation)+ '>>>');
    res.render('searchPage.html', {userInfo: JSON.stringify(userInformation), grp: JSON.stringify(groupDetails) });

});

router.get('/partials/:filename', function(req, res){
    var filename = req.params.filename;
    if(!filename) return;  // might want to change this
    res.render("partials/" + filename );
});

module.exports = router;
