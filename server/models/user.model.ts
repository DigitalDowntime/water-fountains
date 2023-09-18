import { Mongoose, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        passwordHash: { type: String, required: true },
        admin: { type: Boolean, required: true }
    },
    { timestamps: true }
);

// type User = InferSchemaType<typeof UserSchema>;

const userModelCreator = (mongoose: Mongoose) => {
    const User = mongoose.model("user", UserSchema);

    return User;
}

export default userModelCreator;
