// var error = require('./mapping/errorMapping.js');
// // Admin page
// // Status: in Progress
// exports.admin = function(req, res) {
//     // Logic:
//     // If user signs in from mainsite.com/admin -> check headers for user role info
//     // if user signs in to mainsite.com and then goes to admin page -> check preset roles from main page.
//
//     var app = require('../server');
//
//     if (typeof(req.headers.group) != "undefined") {
//         if (req.headers.group.includes("OSE3")) {
//             logger.info('>>> user has Admin Access >>>');
//             res.render('admin.html');
//         } else {
//             logger.info('>>> ACCESS DENIED Admin screen >>>');
//             res.send("ACCESS DENIED");
//         }
//
//     } else { // no group headers found
//         if (typeof(app.get('userRole')) != "undefined") {
//             if (app.get('userRole') == 'ADMIN') {
//                 ogger.info('>>> user has Admin Access >>>');
//                 res.render('admin.html');
//             } else {
//                 logger.info('>>> ACCESS DENIED Admin screen >>>');
//                 res.send("ACCESS DENIED");
//             }
//         } else { // This will only happen if running locsally, and going straight to admin page
//             res.send("404- no headers found and user role has not been defined");
//         }
//     }
// };
//
// exports.index = function(req, res){
//   res.render('index.html', { firstName: req.headers.firstname, lastName: req.headers.lastname });
//
// }
// // Main page user will land on after loging in. (Main search page.)
// exports.search = function(req, res) {
//     // Logic
//     // if users signs in to mainsite.com -> check headers for AD group and decide which role to assgin
//     // if users is signs in to local env -> pass in generic info
//     // no matter what export (set) the user role for use in other routes
//     var adminAccessADGroups = config.adminAccessADGroup;
//     var memberAccessADGroups = config.memberAccessADGroup;
//     function hasAccess(ADGroups){
//       for(var i = 0; i < ADGroups.length; i++){
//         if(req.headers.group.includes(ADGroups[i])){
//             logger.info('>>> user has ADGroups Access >>>');
//           return true;
//         }
//       }
//       return false;
//     }
//
//     var role = {
//       isAdmin: false,
//       isMember: false
//     };
//
//     if (typeof(req.headers.group) != "undefined") {
//         if (hasAccess(adminAccessADGroups)) {
//           role.isAdmin = true;
//           logger.info('>>> user has ADMIN Access >>>');
//         }
//         if(hasAccess(memberAccessADGroups)) {
//           role.isMember = true;
//           logger.info('>>> user has Member Access >>>');
//         }
//     }
//     else {
//         // this is were you would redirect that .uhc link
//       req.headers.firstname = "Local";
//       req.headers.lastname = "Env";
//       role = {
//         isAdmin: true,
//         isMember: true
//       }; // carefully with this line, must change later. change to 'User'  to see how it will look disabled.
//         logger.info('>>> user has Local env Access Admin and Member >>>');
//     }
//
//     var app = require('../server');
//     app.set('userRole', role);
//     // Display main page with user info.
//     logger.info('>>> Login user Info' + JSON.stringify({ firstName: req.headers.firstname, lastName: req.headers.lastname, userRole: JSON.stringify(role) })+ '>>>');
//     res.render('searchPage.html', { firstName: req.headers.firstname, lastName: req.headers.lastname, userRole: JSON.stringify(role) });
//
// };
//
// exports.partials = function(req, res){
//   var filename = req.params.filename;
//   if(!filename) return;  // might want to change this
//   res.render("partials/" + filename );
// };
//
// exports.findIndividualPost = function(req, res) {
//   var fIService = require('./services/findIndividualService.js');
//   var individualMapping = require('./mapping/findIndividualMapping.js');
//   var individualRequest = req.body;
//     logger.debug('>>> findIndividualPost service call start | request '+ JSON.stringify(individualRequest) +' >>>');
//   //Timing the API function OIL request + Internal Mapping
//   var start = new Date().getTime();
//   var findIndividualOilRequest = individualMapping.requestMapping(individualRequest);
//
//   fIService.ResponseforFrontEnd(findIndividualOilRequest).then(function(result){
//     var diff = new Date().getTime() - start;
//     logger.info('--- Time Taken for FindIndividual Internal API call - ' + diff / 1000 + ' seconds. --- ');
//     if(result.individual.length == 0){
//      logger.debug('<<< NO Result found - findIndividualPost with Response '+ JSON.stringify(result) +' <<<');
//      res.status(404).send(result);
//     }else{
//      logger.debug('<<< findIndividualPost service end <<<');
//      res.send(result);
//     }
//   }, function(err){
//      logger.error('<<< findIndividualPost with error Response '+ err +' <<<');
//     res.status(err.errors.code || 500).send(err);
//   }).catch(function(ex){
//     var mappedEx = error.exceptionMapping(ex, 'FindIndividualService');
//       logger.error('<<< findIndividualPost with exception '+ ex +' <<<');
//     res.status(500).send(mappedEx);
//   });
// }
//
// exports.findMembershipPost = function(req, res) {
//   console.log(req.body);
//   var findMembershipService = require('./services/findMembershipService.js');
//   var membershipMapping = require('./mapping/findMembershipMapping.js');
//   var membershipRequest = req.body;
//   logger.debug('>>> findMembershipPost service call start | request '+ JSON.stringify(membershipRequest) +' >>>');
//   var start = new Date().getTime();
//   var findMembershipOilRequest = membershipMapping.requestMapping(membershipRequest);
//   findMembershipService.ResponseforFrontEnd(findMembershipOilRequest).then(function(result){
//     var diff = new Date().getTime() - start;
//     logger.info('--- Time Taken for FindMembership Internal API - ' + diff / 1000 + ' seconds.---');
//       logger.debug('<<< findMembershipPost service call end <<<');
//     res.send(result);
//   }, function(err){
//     logger.error('<<< findMembershipPost service call with error Response '+ JSON.stringify(err) +' <<<');
//     res.status(err.errors.code || 500).send(err);
//   }).catch(function(ex){
//     logger.error('<<< findMembershipPost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
//     var mappedEx = error.exceptionMapping(ex, 'FindMembershipService');
//     res.status(err.errors.code || 500).send(mappedEx);
//   });
// }
//
// exports.getMembershipPost = function(req, res) {
//   var getMembershipService = require('./services/getMembershipService.js');
//   var getMembershipMapping = require('./mapping/getMembershipMapping.js');
//   var getMembershipRequest = req.body;
//   var start = new Date().getTime();
//     logger.debug('>>> getMembershipPost service call start | request '+ JSON.stringify(getMembershipRequest) +' >>>');
//   var getMembershipOilRequest = getMembershipMapping.requestMapping(getMembershipRequest);
//   getMembershipService.ResponseforFrontEnd(getMembershipOilRequest).then(function(result){
//     var diff = new Date().getTime() - start;
//     logger.info('Time Taken for GetMembership Internal API - ' + diff / 1000 + ' seconds.');
//     logger.debug('<<< getMembershipPost service call end <<<');
//     res.send(result);
//   }, function(err){
//       logger.error('<<< getMembershipPost service call with error Response '+ JSON.stringify(err) +' <<<');
//     res.status(err.errors.code || 500).send(err);
//   }).catch(function(ex){
//       logger.error('<<< getMembershipPost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
//     var mappedEx = error.exceptionMapping(ex, 'GetMembershipService');
//     res.status(500).send(mappedEx);
//   });
// }
//
// exports.getMemberFamilyPost = function(req, res){
//   var familyService = require('./services/getMemberFamilyService.js');
//   var familyMapping = require('./mapping/getMemberFamilyMapping.js');
//   var familyRequest = req.body;
//   var start = new Date().getTime();
//     logger.debug('>>> getMemberFamilyPost service call start request | request '+ JSON.stringify(familyRequest) +' >>>');
//   var getMemberFamilyOilRequest = familyMapping.requestMapping(familyRequest);
//   familyService.ResponseforFrontEnd(getMemberFamilyOilRequest).then(function(result){
//     var diff = new Date().getTime() - start;
//     logger.info('Time Taken for GetMemberFamily Internal API - ' + diff / 1000 + ' seconds.');
//     logger.debug('<<< getMemberFamilyPost service call end <<<');
//     res.send(result);
//   }, function(err){
//       logger.error('<<< getMemberFamilyPost service call with error Response '+ JSON.stringify(err) +' <<<');
//     res.status(err.errors.code || 500).send(err);
//   }).catch(function(ex){
//       logger.error('<<< getMemberFamilyPost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
//     var mappedEx = error.exceptionMapping(ex, 'GetMemberFamilyService');
//     res.status(500).send(mappedEx);
//   });
// }
//
// exports.findEmployerGroupPost = function(req, res){
//     var findGroupService = require('./services/findEmployerGroupService.js');
//     var findGroupMapping = require('./mapping/findEmployerGroupMapping.js');
//     var findGroupRequest = req.body;
//     var start = new Date().getTime();
//     logger.debug('>>> findEmployerGroupPost service call start request | request '+ JSON.stringify(findGroupRequest) +' >>>');
//     var findEmployerGroupOilRequest = findGroupMapping.requestMapping(findGroupRequest);
//     findGroupService.ResponseforFrontEnd(findEmployerGroupOilRequest).then(function(result){
//       var diff = new Date().getTime() - start;
//       logger.info('Time Taken for FindEmployerGroup Internal API - ' + diff / 1000 + ' seconds.');
//       logger.debug('<<< findEmployerGroupPost service call end <<<');
//       res.send(result);
//
//     }, function(err){
//         logger.error('<<< findEmployerGroupPost service call with error Response '+ JSON.stringify(err) +' <<<');
//       res.status(err.errors.code || 500).send(err);
//     }).catch(function(ex){
//         logger.error('<<< findEmployerGroupPost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
//       var mappedEx = error.exceptionMapping(ex, 'FindEmployerGroupService');
//       res.status(500).send(mappedEx);
//     });
//
// }
//
// exports.getEmployerGroupPost = function(req, res){
//     var getGroupService = require('./services/getEmployerGroupService.js');
//     var getGroupMapping = require('./mapping/getEmployerGroupMapping.js');
//     var getGroupRequest = req.body;
//     var start = new Date().getTime();
//
//     var getEmployerGroupOilRequest = getGroupMapping.requestMapping(getGroupRequest);
//     getGroupService.ResponseforFrontEnd(getEmployerGroupOilRequest).then(function(result){
//       var diff = new Date().getTime() - start;
//       logger.info('Time Taken for GetEmployerGroup Internal API - ' + diff / 1000 + ' seconds.');
//       res.send(result);
//
//     }, function(err){
//       res.status(err.errors.code || 500).send(err);
//     }).catch(function(ex){
//       var mappedEx = error.exceptionMapping(ex, 'GetEmployerGroupService');
//       res.status(500).send(mappedEx);
//     });
//
// }
//
// exports.getSubscriptionServiceBenefitPost = function(req, res){
//   var serviceBenefitService = require('./services/getSubscriptionServiceBenefitService.js');
//   var serviceBenefitMapping = require('./mapping/getSubscriptionServiceBenefitMapping.js');
//   var serviceBenefitRequest = req.body;
//   var start = new Date().getTime();
//   logger.debug('>>> getSubscriptionServiceBenefitPost service call start | request '+ JSON.stringify(serviceBenefitRequest) +' >>>');
//   var getSubscriptionServiceBenefitOilRequest = serviceBenefitMapping.requestMapping(serviceBenefitRequest);
//
//   serviceBenefitService.ResponseforFrontEnd(getSubscriptionServiceBenefitOilRequest).then(function(result){
//     var diff = new Date().getTime() - start;
//     logger.info('Time Taken for GetSubscriptionServiceBenefit Internal API - ' + diff / 1000 + ' seconds.');
//     logger.debug('<<< getSubscriptionServiceBenefitPost service call end <<<');
//     res.send(result);
//   }, function(err){
//       logger.error('<<< getSubscriptionServiceBenefitPost service call with error Response '+ JSON.stringify(err) +' <<<');
//     res.status(err.errors.code || 500).send(err);
//   }).catch(function(ex){
//       logger.error('<<< getSubscriptionServiceBenefitPost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
//     var mappedEx = error.exceptionMapping(ex, 'GetSubscriptionServiceBenefitService');
//     res.status(500).send(mappedEx);
//   });
// }
//
// exports.getBenefitLanguagePost = function(req, res) {
//     var languageService = require('./services/getBenefitLanguageService.js');
//     var languageMapping = require('./mapping/getBenefitLanguageMapping.js');
//     var languageRequest = req.body;
//     var start = new Date().getTime();
//     logger.debug('>>> getBenefitLanguagePost service call start | request '+ JSON.stringify(languageRequest) +' >>>');
//     var getBenefitLanguageOilRequest = languageMapping.requestMapping(languageRequest);
//
//     languageService.ResponseforFrontEnd(getBenefitLanguageOilRequest).then(function(result){
//       var diff = new Date().getTime() - start;
//       logger.info('Time Taken for GetBenefitLanguage Internal API - ' + diff / 1000 + ' seconds.');
//       logger.debug('<<< getBenefitLanguagePost service call end <<<');
//       res.send(result);
//     }, function(err){
//       logger.error('<<< getBenefitLanguagePost service call with error Response '+ JSON.stringify(err) +' <<<');
//       res.status(err.errors.code || 500).send(err);
//     }).catch(function(ex){
//       logger.error('<<< getBenefitLanguagePost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
//       var mappedEx = error.exceptionMapping(ex, 'GetSubscriptionServiceBenefitService');
//       res.status(500).send(mappedEx);
//     });
//
// };
//
// exports.getQuickLinks = function(req, res) {
//     var mongoClient = require('./mongoDBconfig.js');
//     mongoClient.mongoConnect(function(dbConnection) {
//         var collection = dbConnection.collection(config.MONGODB_COLLECTION_LINKS);
//         mongoClient.getAllDocuments(collection, function(doc) {
//             res.send(doc[0]);
//             dbConnection.close();
//         });
//     });
// };
//
// exports.postQuickLinks = function(req, res) {
//   var mongoClient = require('./mongoDBconfig.js');
//   var updatedLinks = req.body.links;
//   mongoClient.mongoConnect(function(dbConnection) {
//     var collection = dbConnection.collection(config.MONGODB_COLLECTION_LINKS);
//     mongoClient.updateDocument(collection, updatedLinks, function(doc) {
//       res.send(doc);
//       dbConnection.close();
//     });
//   });
// }
//
// exports.getDocument = function(req, res){
//   var id = req.query.id;
//   var request = {
//   	"getDocument": {
//       "getDocumentRequest": {
//         "repositoryId": " PSEUDO1",
//         "documentId": '0902b1fc800adf1d'
//       }
//     }
//   };
//   var startTime = new Date().getTime();
//   logger.info('request sent');
//   var documentService = require('./services/getDocumentService.js');
//   var start = new Date().getTime();
//   logger.info('request going');
//   documentService.ResponseforFrontEnd(request).then(function(docResult){
//     var diff = new Date().getTime() - start;
//     logger.info('Time Taken for GetDocument Internal API - ' + diff / 1000 + ' seconds.');
//     res.setHeader('Content-disposition', 'attachment; filename=' + docResult.name);
//     res.setHeader('Content-type', docResult.mimetype);
//     console.log('sending to FE');
//     res.end(docResult.bytes);
//   });
// }
