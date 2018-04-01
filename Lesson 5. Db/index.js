const mongoClient = require("mongodb").MongoClient;
const Credentials = require('./credentials');
mongoClient.connect(Credentials.getMongoDbConnectionString(), function (err, db) {
  db.close();
});
