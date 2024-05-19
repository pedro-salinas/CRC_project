import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        hour: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },
        kine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Kine",
            required: true,
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        buy_code: {
            type: String,
        },
        token: {
            type: String,
        },
        state: {
            type: String,
            enum: ["pendiente", "pagado", "pagando", "cancelado", "bloqueado"],
            required: true,
        },
        blocked: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Attention", userSchema);
