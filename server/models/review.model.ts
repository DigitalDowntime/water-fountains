import { Model, Mongoose, ObjectId, Schema } from "mongoose";

interface IReviewDocument {
    _id: ObjectId,
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
