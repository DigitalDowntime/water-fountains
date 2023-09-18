import { fountainModelCreator, IFountainModel } from "./fountain.model.js";
import { reviewModelCreator, IReviewModel } from "./review.model.js";
import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

interface dbConfig {
    mongoose: Mongoose,
    url: string,
    fountains: IFountainModel,
    reviews: IReviewModel
}

const db: dbConfig = {
    mongoose: mongoose,
    url: process.env.DB_URL || "",
    fountains: fountainModelCreator(mongoose),
    reviews: reviewModelCreator(mongoose)
};

export default db;
