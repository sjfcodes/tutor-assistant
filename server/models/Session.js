const { Schema, model } = require('mongoose');

const MeetingSchema = new Schema({
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
    status: {
        type: String,
        required: true,
        default: 'scheduled'
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/ 
        // get: (timestamp) => dateFormat(timestamp),
    }
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;