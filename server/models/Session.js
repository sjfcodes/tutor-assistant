const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    back2back: {
        type: Boolean,
        default: false
    },
    startingAt: {
        type: Number,
        required: true
    },
    confirmationSent: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        default: 'scheduled'
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/ 
        // get: (timestamp) => dateFormat(timestamp),
    }
});

const Session = model('Session', sessionSchema);

module.exports = Session;