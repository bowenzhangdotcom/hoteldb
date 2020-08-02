const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

let codeSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    codes: [String]
});

const Code = mongoose.model('Code', codeSchema);

mongoose.connect('mongodb://localhost:27017/hoteldb', {useNewUrlParser: true, useUnifiedTopology:  true});

const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});

app.get('/', async (req, res) => {
    let hotelName = req.body.hotelName;

    const codes = await Code.find({
        'hotelName': hotelName
    });

    if (!codes) return res.status(404).send('The specified hotel was not found');
    res.send(codes);
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

// todo: 
// test post
// test get
// make put
// test put