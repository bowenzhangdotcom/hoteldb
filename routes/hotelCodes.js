const express = require('express');
const router = express.Router();
const {Code} = require('../model/hotelCode');

router.get('/', async (req, res) => {
    try {
        let hotelCodes = await Code.find({
            'hotelName': req.body.hotelName
        });
        res.send(hotelCodes);
    } catch(error) {
        res.send(error.message);
    };
});

router.post('/', async (req, res) => {   
    const hotelExist = await Code.exists({hotelName: req.body.hotelName});
    if (hotelExist) {
        res.status(400).send('Hotel already exists');
    } else {
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
    }
});

module.exports = router;