const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
    {
        institute: {
            type: String,
            required: true
        },
        fromYear: {
            type: Number,
            required: true
        },
        toYear: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
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

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
