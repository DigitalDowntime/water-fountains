import { Mongoose, Schema } from "mongoose";

const FountainSchema = new Schema(
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
    const Fountain = mongoose.model("fountain", FountainSchema);

    return Fountain;
}

export default fountainModelCreator;
