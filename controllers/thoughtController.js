const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtsData = await Thought.find();
            res.status(200).json(thoughtsData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with that ID number' });
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

