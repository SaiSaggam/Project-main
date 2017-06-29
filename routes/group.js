var error = require('../resources/mapping/errorMapping.js');
var express = require('express');
var router = express.Router();


router.post('/findEmployerGroup', function(req, res){
    var findGroupService = require('../resources/services/findEmployerGroupService.js');
    var findGroupMapping = require('../resources/mapping/findEmployerGroupMapping.js');
    var findGroupRequest = req.body;
    var start = new Date().getTime();
    logger.debug('>>> findEmployerGroupPost service call start request | request '+ JSON.stringify(findGroupRequest) +' >>>');
    var findEmployerGroupOilRequest = findGroupMapping.requestMapping(findGroupRequest);
    findGroupService.ResponseforFrontEnd(findEmployerGroupOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for FindEmployerGroup Internal API - ' + diff / 1000 + ' seconds.');
        logger.debug('<<< findEmployerGroupPost service call end <<<');
        res.send(result);

    }, function(err){
        logger.error('<<< findEmployerGroupPost service call with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        logger.error('<<< findEmployerGroupPost service call with Exception Response '+ JSON.stringify(ex) +' <<<');
        var mappedEx = error.exceptionMapping(ex, 'FindEmployerGroupService');
        res.status(500).send(mappedEx);
    });

});

router.post('/getEmployerGroup', function(req, res){
    var getGroupService = require('../resources/services/getEmployerGroupService.js');
    var getGroupMapping = require('../resources/mapping/getEmployerGroupMapping.js');
    var getGroupRequest = req.body;
    var start = new Date().getTime();

    var getEmployerGroupOilRequest = getGroupMapping.requestMapping(getGroupRequest);
    getGroupService.ResponseforFrontEnd(getEmployerGroupOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for GetEmployerGroup Internal API - ' + diff / 1000 + ' seconds.');
        if(result.benefitBundles.length == 0){
            res.status(404).send(result);
        }else{
            res.send(result);
        }

    }, function(err){
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        var mappedEx = error.exceptionMapping(ex, 'GetEmployerGroupService');
        res.status(500).send(mappedEx);
    });

});
module.exports = router;
