const modelCreator = (mongoose) => {
    const Review = mongoose.model(
        "review",
        mongoose.Schema(
            {
                fountainId: String,
                starRating: Number
            },
            { timestamps: true }
        )
    );

    return Review;
};

export default modelCreator;