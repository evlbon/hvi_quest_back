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
    }
});

module.exports = model('User', userSchema, 'users');