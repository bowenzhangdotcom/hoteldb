const mongoose = require('mongoose');

let codeSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    codes: [String]
});

const Code = mongoose.model('Code', codeSchema);

exports.Code = Code;