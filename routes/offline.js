var express = require('express');
var router = express.Router();
router.post('/member/findIndividual', function(req, res) {

    res.send(config.findIndividual);
});
router.post('/member/findMembership', function(req, res) {
    res.send(config.findMembership);
});

router.post('/member/getMembership', function(req, res) {
    res.send(config.getMembership);
});

router.post('/member/getMemberFamily', function(req, res) {
    res.send(config.getMemberFamily);
});

router.post('/group/findEmployerGroup', function(req, res) {
    res.send(config.findEmployerGroup);
});

router.post('/group/getEmployerGroup', function(req, res) {
    res.send(config.getEmployerGroup);
});

router.post('/member/getSubscriptionServiceBenefit', function(req, res) {
    res.send(config.getSubscriptionServiceBenefit);
});

router.post('/member/getBenefitAccumulator', function(req, res) {
    res.send(config.getBenefitAccumulator);
});

router.post('/member/getBenefitLanguage', function(req, res) {
    res.send(config.getBenefitLanguage);
});


module.exports = router;
