import { Document, Model, Mongoose, Schema } from "mongoose";

interface IReviewDocument extends Document {
    fountainId: string,
    starRating: number
}

interface IReviewModel extends Model<IReviewDocument> { }

const ReviewSchema = new Schema<IReviewDocument, IReviewModel>(
    {
        fountainId: { type: String, required: true },
        starRating: { type: Number, required: true },
    },
    { timestamps: true }
);

const reviewModelCreator = (mongoose: Mongoose) => {
    const Review = mongoose.model<IReviewDocument, IReviewModel>("review", ReviewSchema);

    return Review
}

export { reviewModelCreator, IReviewModel };
