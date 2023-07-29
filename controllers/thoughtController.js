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

    async createThought(req, res) {
        try {
            const newThoughtData = await Thought.create(req.body);

            const userData = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: newThoughtData._id } },
                { runValidators: true, new: true }
            );
            res.json({ newThoughtData, userData });
        } catch (err) {
            res.status(500).json(err);
        }
    },

