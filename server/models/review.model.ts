import { Mongoose, Schema } from "mongoose";


const ReviewSchema = new Schema(
    {
        fountainId: { type: String, required: true },
        starRating: { type: Number, required: true },
    },
    { timestamps: true }
);

const reviewModelCreator = (mongoose: Mongoose) => {
    const Review = mongoose.model("review", ReviewSchema);

    return Review;
}

export default reviewModelCreator;
