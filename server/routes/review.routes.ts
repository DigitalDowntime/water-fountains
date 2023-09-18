import express from "express";
import db from "../models/index.js";
const Review = db.reviews;

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let inserted = await Review.create(req.body);
        res.json({ success: true, inserted })
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err })
    }
})

router.get("/:reviewId", async (req, res) => {
    try {
        let reviewId = req.params.reviewId;
        let review = await Review.findById(reviewId);
        res.json({ "success": true, review });
    } catch (err) {
        console.error(err);
        res.json({ "success": false, "error": err })
    }
})

router.get("/fountain/:fountainId", async (req, res) => {
    try {
        let fountainId = req.params.fountainId;
        let reviews = await Review.find({ fountainId });
        res.json({ success: true, reviews });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.delete("/:reviewId", async (req, res) => {
    try {
        let reviewId = req.params.reviewId;
        let deleteResult = await Review.deleteOne({ "_id": reviewId });
        res.json({ success: deleteResult.acknowledged, deletedCount: deleteResult.deletedCount })
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

export default router;
