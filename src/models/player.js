const {Schema, model} = require('mongoose');

const playerSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    firstPass:{
        type: String,
        required: false
    },

    currentPass:{
        type: String,
        required: false
    }


});

module.exports = model('Player', playerSchema, 'player');