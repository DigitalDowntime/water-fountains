import express from "express";
import db from "../models/index.js";
const Fountain = db.fountains;

const router = express.Router();

router.post("/new", async (req, res) => {
    try {
        let inserted = await Fountain.create(req.body);
        res.json({ "success": true, "inserted": inserted });
    } catch (err) {
        console.error(err);
        res.json({ "success": false, "error": err });
    }
})

router.get("/all", async (req, res) => {
    console.log("Fetching all fountains");
    try {
        let fountains = await Fountain.find();
        res.json({ "success": true, "fountains": fountains });
    } catch (err) {
        console.error(err);
        res.json({ "success": false, "error": err });
    }
})

export default router;