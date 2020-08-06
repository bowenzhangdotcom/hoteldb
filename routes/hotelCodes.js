const express = require('express');
const router = express.Router();
const {validateCode,Code} = require('../model/hotelCode');
const {generalAuth,adminAuth} = require('../middleware/auth');

router.get('/', generalAuth, async (req, res) => {
    try {
        let hotelCodes = await Code.find({
            'hotelName': req.body.hotelName
        });
        res.send(hotelCodes);
    } catch(error) {
        res.send(error.message);
    };
});

router.post('/', adminAuth, async (req, res) => {   
    const {error} = validateCode(req.body);
    if(error) return res.status(400).send(error.details[0].message);

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

router.delete('/', adminAuth, async (req, res) => {
    try {
        let hotelCodes = await Code.deleteOne({
            'hotelName': req.body.hotelName
        });
        if (hotelCodes.n < 1) return res.status(400).send('The hotel with the given name was not found');
        res.send(`The ${req.body.hotelName} has been deleted`);
    } catch(error) {
        res.send(error.message);
    };
});

router.put('/', adminAuth, async (req, res) => {   
    const {error} = validateCode(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let hotelUpdate = await Code.findOne({hotelName: req.body.hotelName});

    if (!hotelUpdate) {
        res.status(400).send('Hotel not found');
    } else {
        try {
            req.body.codes.forEach(newCode => {
                if(!hotelUpdate.codes.includes(newCode)) {
                    hotelUpdate.codes.push(newCode);
                };
            });
            hotelUpdate = await hotelUpdate.save();
            res.send(hotelUpdate);
        } catch(error) {
            res.send(error.message);
        }
    }
});

module.exports = router;