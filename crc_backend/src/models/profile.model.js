import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        variables: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Profile", userSchema);