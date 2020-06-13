const {Schema, model} = require('mongoose');

const passageSchema = new Schema({
    playerId:{
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },

    lastStep: {
        type: Number,
        default: 0
    },

    currentChar:{
        type: String,
        required: false
    },

    activities:{
        healthy:{
            type: [Object],
            default: []
        },
        sick:{
            type: [Object],
            default: []
        },
        virus:{
            type: [Object],
            default: []
        }
    }
});

module.exports = model('Passage', passageSchema, 'passage');