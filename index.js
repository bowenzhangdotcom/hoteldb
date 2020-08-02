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

mongoose.connect('mongodb://localhost:27017/hoteldb', {useNewUrlParser: true, useUnifiedTopology:  true});

const port = process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});

app.get('/', cors(), async (req, res) => {
    let hotelName = req.body.hotelName;

    const codes = await Code.find({
        'hotelName': hotelName
    });

    if (!codes) return res.status(404).send('The specified hotel was not found');
    res.send(codes);
});

app.post('/', cors(), async (req, res) => {
    let newHotel = new Code({
        'hotelName': req.body.name,
        'codes': req.body.codes
    });
    
    newHotel = await newHotel.save();
    res.send(newHotel);
});