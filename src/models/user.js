const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    vkId: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    birthDate:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    school:{
        type: String,
        required: false
    },
    classroom:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: false
    },
    code:{
        type: String,
        required: false
    },
});

module.exports = model('User', userSchema, 'users');