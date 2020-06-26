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

    currentStep: {
        type: String,
        default: "start"
    },

    currentChar:{
        type: String,
        required: false
    },

    startTime:{
        type: Date,
        default(){
            return new Date();
        }
    },

    finishTime:{
        type: Date,
        required: false
    },

    activities:{
        girl:{
            type: [Object],
            default: []
        },
        boy:{
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