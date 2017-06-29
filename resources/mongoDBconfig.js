


 // var getDocument = function(db, envConfig, callback) {
 //      var collection = db.collection(envConfig);
 //      collection.find({}).toArray(function(err, docs) {
 //       if(err) {console.log(err)} else{
 //        console.log("Found the following records for: " + envConfig + " enviroment.");
 //        console.log(docs);
 //        callback(docs); }
 //      });
 //    } // end findDocuments


    // Use connect method to connect to the server

var mongoConnect = function (callback){
    var MongoClient = require('mongodb');
    logger.info('>>> connect to Mongodb >>>' );
    var mongoUrl = "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":"
    + process.env.MONGODB_SERVICE_PORT_MONGO + "/" + process.env.MONGODB_DATABASE;

    if(process.env.NODE_ENV === 'local'|| process.env.NODE_ENV === 'offline'){
        var mongoUrl = "mongodb://" + config.MONGODB_SERVICE_HOST + ":"+ config.MONGODB_SERVICE_PORT_MONGO + "/" + config.MONGODB_DATABASE;
    }
    MongoClient.connect(mongoUrl, function(err, db) {
      if(err){
        logger.error('<<< connect to Mongodb '+ JSON.stringify(err) +' <<<');
        //logger.error(err);
        // console.log(err);
      }
      else {
        callback(db);
        logger.info("<<< Connected successfully to Mongodb <<<");
        // console.log("Connected successfully to db");
          // getAllDocuments(dbConnection, envMode ,function(data) {
          //   res.send(data);
          //   });
        }  // end ifelse

    }); // end mongoClient
}

  var getAllDocuments = function(collection, callback) {
      // var collection = dbConnection.collection(collectionName);
      collection.find({}).toArray(function(err, docs) {
        if(err){
         logger.error('<<< - getAllDocuments  '+ JSON.stringify(err) +' <<<');
         // logger.error(err);
          //  console.log(err);
         }
         else{
          // console.log("Found the following records for: " + process.env.NODE_ENV + " enviroment.");
          callback(docs);
         }
      });
    } // end getAllDocuments


  var removeDocument = function(collection, callback){
    // var collection = dbConnection.collection(collectionName);
    collection.remove({});
    callback();
  }

  var insertDocument = function(collection, jsonObj, callback){
    // var collection = dbConnection.collection(collectionName);
    collection.insert(jsonObj);
    callback(jsonObj);
  }

  var updateDocument = function(collection, jsonObj, callback){
    collection.update({ "link_id" :"1" },  {$set: {"links": jsonObj}}, {multi: true});
    callback(jsonObj);
  }

  var getDocument = function(dbConnection,callback) {
        callback("finish later");
    } // end getAllDocuments

  var mongoDisconnect = function(dbConnection,callback) {
        callback(dbConnection.close());
    } // end getAllDocuments





module.exports = {
  mongoConnect : mongoConnect,
  getAllDocuments : getAllDocuments,
  insertDocument : insertDocument,
  updateDocument : updateDocument,
  removeDocument : removeDocument,
  mongoDisconnect : mongoDisconnect
}
  // end main function}
