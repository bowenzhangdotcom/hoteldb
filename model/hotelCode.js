const mongoose = require('mongoose');
const Joi = require('joi');

let codeSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    codes: [String]
});

const Code = mongoose.model('Code', codeSchema);

function validateCode(code) {
    const schema = Joi.object({
        hotelName: Joi.string().required(),
        codes: Joi.array().items(Joi.string())
    });
    return schema.validate(code);
}

exports.validateCode = validateCode;
exports.Code = Code;