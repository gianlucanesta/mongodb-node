const mongodb = require("mongodb");
const dotEnv = require("dotenv");

dotEnv.config();

const MongoClient = mongodb.MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      console.log("Listening on port 3100");
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
