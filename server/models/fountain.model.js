const modelCreator = (mongoose) => {
    const Fountain = mongoose.model(
        "fountain",
        mongoose.Schema(
            {
                latitude: Number,
                longitude: Number,
                altitude: Number,
                starRating: Number,
                timesLocationRecorded: Number
            },
            { timestamps: true }
        )
    );

    return Fountain;
};

export default modelCreator;