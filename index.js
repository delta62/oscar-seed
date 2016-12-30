const { MongoClient } = require('mongodb');
const config = require('config');
const nominations = require('./data/2016.json');
require('promise-do');


function getConnectionString() {
  let host = config.get('db.host');
  let port = config.get('db.port');
  let db = config.get('db.db');
  return `mongodb://${host}:${port}/${db}`;
}

let docs = Object.keys(nominations.categories).map(key => {
  let options = nominations.categories[key];
  return {
    name: key,
    options
  };
});

let db;

MongoClient.connect(getConnectionString())
  .then(database => db = database)
  .then(db => db.collection('categories'))
  .do(cat => cat.deleteMany({ }))
  .do(cat => cat.insertMany(docs))
  .catch(err => console.error(err))
  .then(() => db.close())
  .then(() => console.log('Done!'));
