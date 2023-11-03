const router = require('express').Router();
const {User, Thoughts} = require('../models');

router.get("/", async (req, res) => {
    try {
        const dbThoughtsData = await Thoughts.find().sort({createdAt: -1});
        res.status(200).json(dbThoughtsData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post("/", async (req, res) => {
    try {
        const dbThoughtsData = await Thoughts.create(req.body);
        const dbUserData = await User.findOneAndUpdate({
            _id: req.body.userId
        }, {
            $push: {
                thoughts: dbThoughtsData._id
            }
        }, {new: true});
        if (! dbUserData) {
            return res.status(404).json({message: "Thoughts with this ID not found!"});
        }
        res.status(200).json(dbThoughtsData);
    } catch (err) {
        res.status(500).json(err)
    }
});
router.put("./:thoughtId", async (req, res) => {
    try {
        const dbThoughtsData = Thoughts.findOneAndUpdate({
            _id: req.params.thoughtsId
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        });
        if (! dbThoughtsData) {
            return req.status(404).json({message: "No thought found!"});
        }
        res.status(200).json(dbThoughtsData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/:thoughtsId", async (req, res) => {
    try {
        const dbThoughtsData = Thoughts.findOneAndRemove({_id: req.params.thoughtsId});
        if (! dbThoughtsData) {
            return res.status(404).json({message: "No thought found!"});
        }
        const dbUserData = await User.findOneAndUpdate({
            thoughts: req.params.thoughtsId
        }, {
            $pull: {
                thoughts: req.params.thoughtsId
            }
        }, {new: true});
        if (! dbUserData) {
            return res.status(404).json({message: "Thought not found!"}) 
       }
       res.json({message: "Thought deleted successfully!"})
    } catch (err) {
        res.json(err)
    }
});

router.post("/:thoughtsId/reactions", async (req, res) => {
    try {
        const dbThoughtsData = await Thoughts.findOneAndUpdate({
            _id: req.params.thoughtsId
        }, {
            $addToSet: {
                reactions: req.body
            }
        }, {
            runValidators: true,
            new: true
        });
        if (! dbThoughtsData) {
            return res.status(404).json({message: "No thought found!"});
        }
        res.status(200).json(dbThoughtsData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/:thoughtsId/reactions/:reactionsId", async (req, res) => {
    try {
        const dbThoughtsData = await Thoughts.findOneAndUpdate({
            _id: req.params.thoughtsId
        }, {
            $pull: {
                reactions: {
                    reactionsId: req.params.reactionsId
                }
            }
        }, {
            runValidators: true,
            new: true,
        });
        if (! dbThoughtsData) {
            return res.status(404),json({message: "No thought found!"});
        }
        res.status(200).json(dbThoughtsData);
        } catch (err) {
            res.status(500).json(err);
        }
        });
    
        module.exports = router;