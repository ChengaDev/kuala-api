const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        organization: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        description: {
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

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
