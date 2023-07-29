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

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { runValidators: true, new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'Invalid thought ID number' });
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thoughtData) {
                return res.status(404).json({ message: 'Invalid Thought ID number' });
            }
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'Invalid Thought ID number' });
            }
            res.json({ message: 'Reaction deleted successfully', thoughtData });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
