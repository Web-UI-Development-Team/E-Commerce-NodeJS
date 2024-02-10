const mongoose = require('mongoose');

const dburl = process.env.URL;

const dbConnection = mongoose.connect(dburl).then(()=>{
    console.log("Successful connection to Mongodb");
}).catch((err)=>{
    console.log(err);
});

module.exports = dbConnection;