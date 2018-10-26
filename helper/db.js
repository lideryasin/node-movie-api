const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect("mongodb://lider_movie_user:y653407706@ds257372.mlab.com:57372/lider-movie-api", { useMongoClient: true })
    mongoose.connection.on('open', () => {
        console.log("MongoDB: Connected");
    })
    mongoose.connection.on('error', (err) => {
        console.log("MongoDB: Error ", err);
    })

    mongoose.Promise = global.Promise;
}