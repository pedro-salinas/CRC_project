import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        rut: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        is_staff: {
            type: Boolean,
            default: false,
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        last_login: {
            type: Date,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
