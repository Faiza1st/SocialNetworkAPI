const { Thought, User } = require('../models');
const { Types } = require('mongoose');

const thoughtController = {
    async getThoughtsAll(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            console.log('Having ERROR getting all the thoughts', err);
            res.status(500).json(err);
        }
    },
    async getoneThought(req, res) {
        try {
            const thoughtId = await Thought.findOne({ _id: req.params.id })
                .select("-__v")
                .populate('reactions');

            if (!thoughtId) {
                return res.status(404).json({ message: 'Thought Not found with this ID' });
            }
            res.json(thoughtId);
        } catch (err) {
            console.log("ERROR in GETTING one THOUGHT", err);
            res.status(500).json(err);
        }
    },
    async thoughtCreate(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const userID = req.body.userID;
            const user = await User.findById(userID);

            if (!user) {
                return res.status(404).json({ message: "User Id not Found!" });
            }
            user.thoughts.push(thought._id);
            await user.save();

            res.status(200).json({ message: 'Thought have been created successfully', thought });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err: 'Thought is not able to be created!' });
        }
    },
    async thoughtUpdated(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "No Thought with this id was found." });
            }

            res.status(200).json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Could not update!', err });
        }
    },
    async deleteThough(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!deletedThought) {
                return res.status(404).json({ message: "No Thought with this id was found" });
            }
            res.status(200).json({ message: "Deletion Successful!" });
        } catch (err) {
            console.log('Can not be deleted', err);
            res.status(500).json(err);
        }
    },

    async reactionCreate(req, res) {
        try {
            const addReaction = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!addReaction) {
                return res.status(404).json({ message: 'No Thought with this id exists' });
            }
            res.json(addReaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async reactionDelete(req, res) {
        try {
            const removed = await Thought.findByIdAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.id } } },
                { runValidators: true, new: true }
            );
            if (!removed) {
                return res.status(404).json({ message: 'No Reaction with this Id!' });
            }
            res.json({ message: 'Removal successful!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;