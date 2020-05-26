const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    appToken: {
        type: String,
        required: true
    },
    contentTokens: {
        type: [Object],
        default: [],
    }
});

module.exports = model('User', userSchema, 'users');