const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
    {
        organiztion: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        positionTitle: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        positionDescription: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        startDate: {
            type: mongoose.Schema.Types.Date
        },
        endDate: {
            type: mongoose.Schema.Types.Date
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
