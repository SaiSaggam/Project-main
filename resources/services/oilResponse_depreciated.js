// var getOILResponse = require('./responseGenerator.js');
//
// /*
// Desc: Calls the responseGenerator module to get the response from the oil, depending upon which service is calling this function, it sets the path.
// Params: req : The Oil formatted request JSON.
//         type: The type pf service which is calling this function.
//         res: The callback function it needs to trigger when the call is complete.
// Status: Stable
// Notes: DO NOT MAKE ANY CHANGES
// */
//
// exports.response = function(req, type, res) {
//     var path = '';
//
//     if (type === "findIndividual") {
//         path = config.findIndividual.v2;
//     } else if (type === "findMembership") {
//         path = config.findMembership.v2;
//     } else if (type === "getSubscriptionBenefit") {
//         path = config.getSubscriptionBenefit.v2;
//     }
//
//     getOILResponse.getRes(req, path, res);
//
// }
