const express = require('express');
const projectsRouter = new express.Router();
const Project = require('../models/project');
const auth = require('../middleware/auth');

// Get my projects
projectsRouter.get('/projects/me', auth, async (req, res) => {
    try {
        if (!req.user) {
            return res
                .status(401)
                .send({ error: 'Authorization failed, please login again' });
        }
        await req.user
            .populate({
                path: 'projects'
            })
            .execPopulate();
        return res.send(req.user.projects);
    } catch (error) {
        return res.status(500).send(e);
    }
});

// Get single project
projectsRouter.get('/projects/:id', auth, async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findOne({
            _id: projectId,
            owner: req.user._id
        });

        if (!project) {
            return res.status(404).send();
        }
        return res.send(project);
    } catch (error) {
        return res.status(500).send();
    }
});

// Add new project
projectsRouter.post('/projects', auth, async (req, res) => {
    const project = new Project({ ...req.body, owner: req.user._id });
    try {
        await project.save();
        return res.status(201).send({ project });
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Delete a project
projectsRouter.delete('/projects/:id', auth, async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!project) {
            return res.status(404).send();
        }
        return res.send(project);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = projectsRouter;
