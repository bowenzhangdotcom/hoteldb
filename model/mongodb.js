const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hoteldb.codes', {useNewUrlParser: true}, () => {
    if(!err) {
        console.log('Connected to MongoDb..');
    }
    else {
        console.log('Failed to connect to MongoDb' + err)
    };
});


