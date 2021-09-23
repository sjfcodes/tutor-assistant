const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    confirmationSent: {
        type: Boolean,
        required: true,
        default: false
    },
    startingAt: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/ 
        // get: (timestamp) => dateFormat(timestamp),
    }
});

const Session = model('Session', sessionSchema);

module.exports = Session;