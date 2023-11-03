const router = require('express').Router();
const {User, Thoughts} = require('../models');

router.get("/", async (req, res) => {
    try {
        const dbUserData = await User.find();
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put("./:userId", async (req, res) => {
    try {
        const dbUserData = User.findOneAndUpdate({
            _id: req.params.UserId
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        });
        if (! dbUserData) {
            return req.status(404).json({message: "No thought found!"});
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:userId", async (req, res) => {
    try {
        const dbUserData = User.findOneAndRemove({_id: req.params.thoughtsId});
        if (! dbUserData) {
            return res.status(404).json({message: "No thought found!"});
        }
        if (! dbUserData) {
            return res.status(404).json({message: "User not found!"}) 
       }
       res.json({message: "User deleted successfully!"})
    } catch (err) {
        res.json(err)
    }
});

router.post("/:userId/reactions", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({
            _id: req.params.thoughtsId
        }, {
            $addToSet: {
                reactions: req.body
            }
        }, {
            runValidators: true,
            new: true
        });
        if (! dbUserData) {
            return res.status(404).json({message: "No thought found!"});
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:userId/reactions/:reactionsId", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({
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
        if (! dbUserData) {
            return res.status(404),json({message: "No thought found!"});
        }
        res.status(200).json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
        });

module.exports = router;