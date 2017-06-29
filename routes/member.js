var error = require('../resources/mapping/errorMapping.js');
var express = require('express');
var router = express.Router();

router.post('/findIndividual',function(req, res) {
    var fIService = require('../resources/services/findIndividualService.js');
    var individualMapping = require('../resources/mapping/findIndividualMapping.js');
    var individualRequest = req.body;
    logger.debug('>>> findIndividual service call start | request '+ JSON.stringify(individualRequest) +' >>>');
    //Timing the API function OIL request + Internal Mapping
    var start = new Date().getTime();
    var findIndividualOilRequest = individualMapping.requestMapping(individualRequest);
    fIService.ResponseforFrontEnd(findIndividualOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('--- Time Taken for FindIndividual Internal API call - ' + diff / 1000 + ' seconds. --- ');
        if(result.individual.length == 0){
            logger.debug('<<< NO Result found - findIndividual with Response '+ JSON.stringify(result) +' <<<');
            res.status(404).send(result);
        }else{
            logger.debug('<<< findIndividual service end <<<');
            res.send(result);
        }
    }, function(err){
        logger.error('<<< findIndividual with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        var mappedEx = error.exceptionMapping(ex, 'FindIndividualService');
        logger.error('<<< findIndividual with exception '+ ex +' <<<');
        res.status(500).send(mappedEx);
    });
});

router.post('/findMembership', function(req, res) {
    var findMembershipService = require('../resources/services/findMembershipService.js');
    var membershipMapping = require('../resources/mapping/findMembershipMapping.js');
    var membershipRequest = req.body;
    logger.debug('>>> findMembership service call start | request '+ JSON.stringify(membershipRequest) +' >>>');
    var start = new Date().getTime();
    var findMembershipOilRequest = membershipMapping.requestMapping(membershipRequest);
    findMembershipService.ResponseforFrontEnd(findMembershipOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('--- Time Taken for FindMembership Internal API - ' + diff / 1000 + ' seconds.---');
        logger.debug('<<< findMembership service call end <<<');
        res.send(result);
    }, function(err){
        logger.error('<<< findMembership service call with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        logger.error('<<< findMembership service call with Exception Response '+ JSON.stringify(ex) +' <<<');
        var mappedEx = error.exceptionMapping(ex, 'FindMembershipService');
        res.status(err.errors.code || 500).send(mappedEx);
    });
});

router.post('/getMembership', function(req, res) {
    var getMembershipService = require('../resources/services/getMembershipService.js');
    var getMembershipMapping = require('../resources/mapping/getMembershipMapping.js');
    var getMembershipRequest = req.body;
    var start = new Date().getTime();
    logger.debug('>>> getMembership service call start | request '+ JSON.stringify(getMembershipRequest) +' >>>');
    var getMembershipOilRequest = getMembershipMapping.requestMapping(getMembershipRequest);
    getMembershipService.ResponseforFrontEnd(getMembershipOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for GetMembership Internal API - ' + diff / 1000 + ' seconds.');
        logger.debug('<<< getMembership service call end <<<');
        res.send(result);
    }, function(err){
        logger.error('<<< getMembership service call with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        logger.error('<<< getMembership service call with Exception Response '+ JSON.stringify(ex) +' <<<');
        var mappedEx = error.exceptionMapping(ex, 'GetMembershipService');
        res.status(500).send(mappedEx);
    });
});


router.post('/getMemberFamily', function(req, res){
    var familyService = require('../resources/services/getMemberFamilyService.js');
    var familyMapping = require('../resources/mapping/getMemberFamilyMapping.js');
    var familyRequest = req.body;
    var start = new Date().getTime();
    logger.debug('>>> getMemberFamily service call start request | request '+ JSON.stringify(familyRequest) +' >>>');
    var getMemberFamilyOilRequest = familyMapping.requestMapping(familyRequest);
    familyService.ResponseforFrontEnd(getMemberFamilyOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for GetMemberFamily Internal API - ' + diff / 1000 + ' seconds.');
        logger.debug('<<< getMemberFamily service call end <<<');
        res.send(result);
    }, function(err){
        logger.error('<<< getMemberFamily service call with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        logger.error('<<< getMemberFamily service call with Exception Response '+ JSON.stringify(ex) +' <<<');
        var mappedEx = error.exceptionMapping(ex, 'GetMemberFamilyService');
        res.status(500).send(mappedEx);
    });
});

router.post('/getSubscriptionServiceBenefit', function(req, res){
    var serviceBenefitService = require('../resources/services/getSubscriptionServiceBenefitService.js');
    var serviceBenefitMapping = require('../resources/mapping/getSubscriptionServiceBenefitMapping.js');
    var serviceBenefitRequest = req.body;
    var start = new Date().getTime();
    logger.debug('>>> getSubscriptionServiceBenefit service call start | request '+ JSON.stringify(serviceBenefitRequest) +' >>>');
    var getSubscriptionServiceBenefitOilRequest = serviceBenefitMapping.requestMapping(serviceBenefitRequest);

    serviceBenefitService.ResponseforFrontEnd(getSubscriptionServiceBenefitOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for GetSubscriptionServiceBenefit Internal API - ' + diff / 1000 + ' seconds.');
        logger.debug('<<< getSubscriptionServiceBenefit service call end <<<');
        res.send(result);
    }, function(err){
        logger.error('<<< getSubscriptionServiceBenefit service call with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        logger.error('<<< getSubscriptionServiceBenefit service call with Exception Response '+ JSON.stringify(ex) +' <<<');
        var mappedEx = error.exceptionMapping(ex, 'GetSubscriptionServiceBenefitService');
        res.status(500).send(mappedEx);
    });
});

router.post('/getBenefitAccumulator', function(req, res){
    var accumulatorService = require('../resources/services/getBenefitAccumulatorService.js');
    var accumulatorMapping = require('../resources/mapping/getBenefitAccumulatorMapping.js');
    var accumulatorRequest = req.body;
    var start = new Date().getTime();
    logger.debug('>>> getBenefitAccumulator service call start | request '+ JSON.stringify(accumulatorRequest) +' >>>');
    var getBenefitAccumulatorOilRequest = accumulatorMapping.requestMapping(accumulatorRequest);

    accumulatorService.ResponseforFrontEnd(getBenefitAccumulatorOilRequest).then(function(result){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for GetBenefitAccumulator Internal API - ' + diff / 1000 + ' seconds.');
        logger.debug('<<< getBenefitAccumulator service call end <<<');
        res.send(result);
    }, function(err){
        logger.error('<<< getBenefitAccumulator service call with error Response '+ JSON.stringify(err) +' <<<');
        res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
        logger.error('<<< getBenefitAccumulator service call with Exception Response '+ JSON.stringify(ex) +' <<<');
        var mappedEx = error.exceptionMapping(ex, 'GetBenefitAccumulatorService');
        res.status(500).send(mappedEx);
    });
});

router.post('/getBenefitLanguage', function(req, res) {
    var languageService = require('../resources/services/getBenefitLanguageService.js');
    var languageMapping = require('../resources/mapping/getBenefitLanguageMapping.js');
    var languageRequest = req.body;
    var start = new Date().getTime();
    logger.debug('>>> getBenefitLanguage service call start | request '+ JSON.stringify(languageRequest) +' >>>');

    var getBenefitLanguageOilRequest = languageMapping.requestMapping(languageRequest);
    languageService.ResponseforFrontEnd(getBenefitLanguageOilRequest).then(function(result) {
      var diff = new Date().getTime() - start;
      logger.info('Time Taken for GetBenefitLanguage Internal API - ' + diff / 1000 + ' seconds.');
      logger.debug('<<< getBenefitLanguage service call end <<<');
      res.send(result);
    }, function(err){
      logger.error('<<< getBenefitLanguage service call with error Response '+ JSON.stringify(err) +' <<<');
      res.status(err.errors.code || 500).send(err);
    }).catch(function(ex){
      logger.error('<<< getBenefitLanguage service call with Exception Response '+ JSON.stringify(ex) +' <<<');
      var mappedEx = error.exceptionMapping(ex, 'GetBenefitLanguageService');
      res.status(500).send(mappedEx);
    });

});

module.exports = router;
