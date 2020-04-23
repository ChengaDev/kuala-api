const express = require('express');
const educationRouter = new express.Router();
const Education = require('../models/education');
const auth = require('../middleware/auth');

// Get my educations
educationRouter.get('/educations/me', auth, async (req, res) => {
    try {
        if (!req.user) {
            return res
                .status(401)
                .send({ error: 'Authorization failed, please login again' });
        }
        await req.user
            .populate({
                path: 'educations'
            })
            .execPopulate();
        return res.send(educations);
    } catch (error) {
        return res.status(500).send(e);
    }
});

// Get single education
educationRouter.get('/educations/:id', auth, async (req, res) => {
    const educationId = req.params.id;

    try {
        const education = await Education.findOne({
            _id: educationId,
            owner: req.user._id
        });

        if (!education) {
            return res.status(404).send();
        }
        return res.send(education);
    } catch (error) {
        return res.status(500).send();
    }
});

// Add new education
educationRouter.post('/educations', auth, async (req, res) => {
    const education = new Education({ ...req.body, owner: req.user._id });
    try {
        await education.save();
        return res.status(201).send({ education });
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Delete an education
educationRouter.delete('/educations/:id', auth, async (req, res) => {
    try {
        const education = await Education.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!education) {
            return res.status(404).send();
        }
        return res.send(education);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = educationRouter;
