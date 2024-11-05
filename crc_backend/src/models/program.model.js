import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        on_sale_price: {
            type: Number,
            required: true,
        },
        on_sale: {
            type: Boolean,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        },
        agenda: {
            type: Boolean,
            required: true,
        },
        specialty: {
            type: String,
            enum: ["Kinesiología", "Nutrición", "Psicología"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Program", userSchema);
