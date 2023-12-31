import express from "express";
import db from "../models/index";
import bcrypt from "bcrypt";
const User = db.users;

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (req.session.user_id) {
            res.status(403).json({ success: false, error: "You are already logged in" });
            return;
        }

        let username = req.body.username;
        let plaintextPassword = req.body.password;

        // check if user exists aready
        let storedUser = await User.findOne({ username });
        if (storedUser) {
            res
                .status(409)
                .json({ success: false, error: "A user with that username already exists" });
            return;
        }

        let salt = await bcrypt.genSalt();
        let passwordHash = await bcrypt.hash(plaintextPassword, salt);

        let inserted = await User.create({ username, passwordHash, admin: false });
        res.json({ success: true, inserted: { username: inserted.username } });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.post("/login", async (req, res) => {
    try {
        if (req.session.user_id) {
            res.status(403).json({ success: false, error: "You are already logged in" })
            return;
        }

        let username = req.body.username;
        let plaintextPassword = req.body.password;

        let storedUser = await User.findOne({ username });

        if (!storedUser) {
            res.status(401).json({ success: false, error: "User not found" });
        } else {
            let loginSuccess = await bcrypt.compare(plaintextPassword, storedUser.passwordHash);

            if (!loginSuccess) {
                res.status(401).json({ success: false, error: "Invalid credentials" });
            } else {
                req.session.username = storedUser.username;
                req.session.user_id = storedUser._id.toString();
                req.session.save();
                res.json({ success: true });
            }
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err })
    }
})

router.post("/logout", async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(401).json({ success: false, error: "You are not logged in" });
        } else {
            req.session.username = undefined;
            req.session.user_id = undefined;
            req.session.save();

            res.json({ success: true });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

router.get("/current", async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(401).json({ success: false, error: "You are not logged in" });
        } else {
            res.json({ success: true, username: req.session.username, user_id: req.session.user_id });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err });
    }
})

export default router;