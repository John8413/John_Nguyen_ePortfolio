const Joi = require('joi');

const tripSchema = Joi.object({
    code: Joi.string().alphanum().min(3).max(16).required(),
    name: Joi.string().min(3).max(80).required(),
    length: Joi.number().integer().min(1).max(60).required(),
    start: Joi.date().greater('now').required(),
    resort: Joi.string().valid('Maui', 'Oahu', 'Kauai', 'Hawaii').required(),
    perPerson: Joi.number().min(0).max(100000).required(),
    image: Joi.string().uri().optional().allow(''),
    description: Joi.string().max(2000).optional().allow('')
});

module.exports = function validateTrip(req, res, next) {
    const { error, value } = tripSchema.validate(req.body, { abortEarly: true, stripUnknown: true });
    if (error) {
        return res.status(400).json({ message: 'Validation failed', detail: error.details[0].message });
    }
    req.body = value;
    next();
};
