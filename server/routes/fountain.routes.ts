import express from "express";
import db from "../models/index";
const Fountain = db.fountains;
const Review = db.reviews;
const User = db.users;

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(401).json({ success: false, error: "Must be logged in to add a fountain" });
            return;
        }

        let inserted = await Fountain.create(req.body);
        res.json({ success: true, inserted });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.get("/", async (req, res) => {
    try {
        let fountains = await Fountain.find();
        res.json({ success: true, fountains });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.get("/:fountainId", async (req, res) => {
    try {
        let fountainId = req.params.fountainId;
        let fountain = await Fountain.findById(fountainId);
        res.json({ success: true, fountain });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.patch("/:fountainId", async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(401).json({ success: false, error: "You must be logged in" });
        } else {
            let user = await User.findById(req.session.user_id);

            if (!user) {
                res.status(401).json({ success: false, error: "User does not exist" });
            } else {
                if (!user.admin) {
                    res.status(403).json({ success: false, error: "Insufficient permissions" });
                } else {
                    let fountainId = req.params.fountainId;
                    let newData = req.body;
                    let updateResult = await Fountain.updateOne(
                        { "_id": fountainId },
                        newData
                    );
                    res.json({
                        success: updateResult.acknowledged,
                        modifiedCount: updateResult.modifiedCount
                    });
                }
            }
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err })
    }
})

router.delete("/:fountainId", async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(401).json({ success: false, error: "You must be logged in" });
        } else {
            let user = await User.findById(req.session.user_id);

            if (!user) {
                res.status(401).json({ success: false, error: "User does not exist" });
            } else {
                if (!user.admin) {
                    res.status(403).json({ success: false, error: "Insufficient permissions" });
                } else {
                    let fountainId = req.params.fountainId;
                    let fountainDeleteResult = await Fountain.deleteOne({ "_id": fountainId });
                    let reviewsDeleteResult = await Review.deleteMany({ "fountainId": fountainId });

                    res.json({
                        success: fountainDeleteResult.acknowledged,
                        deletedCount: fountainDeleteResult.deletedCount,
                        reviewsDeletion: {
                            success: reviewsDeleteResult.acknowledged,
                            deletedCount: reviewsDeleteResult.deletedCount
                        }
                    });
                }
            }
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err })
    }
})

export default router;
