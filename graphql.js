const Mongoose = require('mongoose');
const Connection_url = "mongodb://tog:tog57588@sandbox-gp-shard-00-00-iquvt.gcp.mongodb.net:27017,sandbox-gp-shard-00-01-iquvt.gcp.mongodb.net:27017,sandbox-gp-shard-00-02-iquvt.gcp.mongodb.net:27017/gp_mockup?ssl=true&replicaSet=sandbox-gp-shard-0&authSource=admin&retryWrites=true";

Mongoose.connect(Connection_url, { useNewUrlParser: true }).then(
    () => {
      console.log("Sandbox GP is Connected");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
);

require ('./Model/User.js')
require ('./Model/profile.js')
