const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    type : { type:String, required:false},
    country : { type:String, required:false},
    first_name : { type:String, required:false},
    last_name : { type:String, required:false},
    business_type: { type:String, required:false},
    stripeAccountId: { type:String, required:false},
    image: { type: String, required: false },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
});

// const accountParams = {
//     type: 'express',
//     country: 'US',
//     email: 'adaklsdjalsd@gmail.com',
//     business_type: 'individual',
//     individual: {
//       first_name: undefined,
//       last_name: undefined,
//       email: 'adaklsdjalsd@gmail.com'
//     }
//   };

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);


