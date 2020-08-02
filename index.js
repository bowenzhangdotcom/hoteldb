const express = require('express');
const mongoose = require('mongoose');
const {Code} = require('./model/hotelCode');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hoteldb', {useNewUrlParser: true, useUnifiedTopology:  true});

const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});

app.get('/', async (req, res) => {
    try {
        let hotelCodes = await Code.find({
            'hotelName': req.body.hotelName
        });
        res.send(hotelCodes);
    } catch(error) {
        res.send(error.message);
    };
});

app.post('/', async (req, res) => {   
    try {
        let newHotel = new Code({ 
            hotelName: req.body.hotelName,
            codes: req.body.codes
        });
        newHotel = await newHotel.save();
        res.send(newHotel);
    } catch(error) {
        res.send(error.message);
    }
});

// make put
// test put