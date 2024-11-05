import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        specialty: {
            type: String,
            enum: ["Kinesiología", "Nutrición", "Psicología"],
            required: true,
        },
        color: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Kine", userSchema);
