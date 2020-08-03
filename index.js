const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/hoteldb', {useNewUrlParser: true, useUnifiedTopology:  true});

app.use(express.json());
app.use('/', require('./routes/hotelCodes'));

const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});