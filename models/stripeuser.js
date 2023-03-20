const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;



const stripeuserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
});

stripeuserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('StripeUser', stripeuserSchema);


