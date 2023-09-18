import fountainModelCreator from "./fountain.model";
import reviewModelCreator from "./review.model";
import userModelCreator from "./user.model";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    uri: process.env.DB_URI || "",
    fountains: fountainModelCreator(mongoose),
    reviews: reviewModelCreator(mongoose),
    users: userModelCreator(mongoose),
};

export default db;
