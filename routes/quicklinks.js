var error = require('../resources/mapping/errorMapping.js');
var express = require('express');
var router = express.Router();

router.get('/getQuickLinks', function(req, res) {
    var mongoClient = require('../resources/mongoDBconfig.js');
    mongoClient.mongoConnect(function(dbConnection) {
        var collection = dbConnection.collection(config.MONGODB_COLLECTION_LINKS);
        mongoClient.getAllDocuments(collection, function(doc) {
            res.send(doc[0]);
            dbConnection.close();
        });
    });
});

router.post('/postQuickLinks',function(req, res) {
    var mongoClient = require('../resources/mongoDBconfig.js');
    var updatedLinks = req.body.links;
    mongoClient.mongoConnect(function(dbConnection) {
        var collection = dbConnection.collection(config.MONGODB_COLLECTION_LINKS);
        mongoClient.updateDocument(collection, updatedLinks, function(doc) {
            res.send(doc);
            dbConnection.close();
        });
    });
});

router.get('/getDocument', function(req, res){
    var id = req.query.id;
    var request = {
        "getDocument": {
            "getDocumentRequest": {
                "repositoryId": " PSEUDO1",
                "documentId": '0902b1fc800adf1d'
            }
        }
    };
    var startTime = new Date().getTime();
    logger.info('request sent');
    var documentService = require('../resources/services/getDocumentService.js');
    var start = new Date().getTime();
    logger.info('request going');
    documentService.ResponseforFrontEnd(request).then(function(docResult){
        var diff = new Date().getTime() - start;
        logger.info('Time Taken for GetDocument Internal API - ' + diff / 1000 + ' seconds.');
        res.setHeader('Content-disposition', 'attachment; filename=' + docResult.name);
        res.setHeader('Content-type', docResult.mimetype);
        console.log('sending to FE');
        res.end(docResult.bytes);
    });
});


module.exports = router;