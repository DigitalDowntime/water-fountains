import { Document, Model, Mongoose, Schema } from "mongoose";

interface IFountainDocument extends Document {
    latitude: number,
    longitude: number,
    altitude: number,
    starRating?: number,
    timesLocationRecorded: number
}

interface IFountainModel extends Model<IFountainDocument> { }

const FountainSchema = new Schema<IFountainDocument, IFountainModel>(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        altitude: { type: Number, required: true },
        starRating: Number,
        timesLocationRecorded: { type: Number, required: true },

    },
    { timestamps: true }
);

const fountainModelCreator = (mongoose: Mongoose) => {
    const Fountain = mongoose.model<IFountainDocument, IFountainModel>("fountain", FountainSchema);

    return Fountain
}

export { fountainModelCreator, IFountainModel };
