const express = require('express');
const userRouter = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Registration
userRouter.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();

        const token = await user.generateAuthToken();
        return res.status(201).send({ user, token });
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Login
userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: 'Login failed' });
    }
});

// Get my user
userRouter.get('/users/me', auth, async (req, res) => {
    try {
        return res.send(req.user);
    } catch (error) {
        return res.status(500).send(e);
    }
});

// Get all users
userRouter.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        return res.send(users);
    } catch (error) {
        return res.status(500).send(e);
    }
});

// Get a user
userRouter.get('/users/:id', auth, async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        return res.status(500).send();
    }
});

module.exports = userRouter;
