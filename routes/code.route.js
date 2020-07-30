const express = require("express");
const mongoose = require('mongoose');
let router = express.Router();
const Code = mongoose.model('Code')

router.get('/marriott', (req,res) => { 
    mariottCodes = await Code.find({name: 'marriott'});
    res.send(mariottCodes);
});