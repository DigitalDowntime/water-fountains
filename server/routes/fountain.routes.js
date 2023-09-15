import express from "express";
import db from "../models/index.js";
const Fountain = db.fountains;
const Review = db.reviews;

const router = express.Router();

router.post("/new", async (req, res) => {
    try {
        let inserted = await Fountain.create(req.body);
        res.json({ success: true, inserted });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.get("/get-all", async (req, res) => {
    try {
        let fountains = await Fountain.find();
        res.json({ success: true, fountains: fountains });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.patch("/update/:fountainId", async (req, res) => {
    try {
        let fountainId = req.params.fountainId;
        let newData = req.body;
        let updateResult = await Fountain.updateOne(
            { "_id": fountainId },
            newData
        );
        res.json({ success: updateResult.acknowledged, modifiedCount: updateResult.modifiedCount })
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err })
    }
})

router.delete("/remove/:fountainId", async (req, res) => {
    try {
        let fountainId = req.params.fountainId;
        let fountainDeleteResult = await Fountain.deleteOne({ "_id": fountainId });
        let reviewsDeleteResult = await Review.deleteMany({ "fountainId": fountainId });
        res.json({
            success: fountainDeleteResult.acknowledged, deletedCount: fountainDeleteResult.deletedCount,
            reviewsDelete: {
                success: reviewsDeleteResult.acknowledged,
                deletedCount: reviewsDeleteResult.deletedCount
            }
        })
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

export default router;