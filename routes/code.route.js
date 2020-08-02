const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const Code = require('../model/hotelCode');

router.get('/', async (req,res) => { 
    const hotelCodes = await Code.find({name: 'marriott'});
    res.send(hotelCodes);
});

router.put('/:hotelname', async (req,res) => { 
    const hotelCodes = await Code.find({name: req.body.name});
    hotelCodes.codes.push(req.body.codes);
    hotelCodes.save(done);
    res.send(`Updated ${req.body.name} with ${req.body.codes}`);
});

module.exports = router;