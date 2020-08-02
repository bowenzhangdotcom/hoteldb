const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

let codeSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: 'This field is required!'
    },
    codes: [String]
});

const Code = mongoose.model('Code', codeSchema);

mongoose.connect('mongodb://localhost:27017/hoteldb.codes');

const port = process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});
