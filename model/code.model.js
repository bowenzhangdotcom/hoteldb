const mongoose = require('mogoose');

let codeSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: 'This field is required!'
    },
    codes: [String]
});

mongoose.model('Code', codeSchema);