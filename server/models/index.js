import fountainModel from "./fountain.model.js";
import reviewModel from "./review.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: process.env.DB_URL,
    fountains: fountainModel(mongoose),
    reviews: reviewModel(mongoose)
};

export default db;