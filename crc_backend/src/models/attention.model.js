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
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
        web_client: {
            type: new mongoose.Schema({
                name: { type: String },
                rut: { type: String },
                email: { type: String },
                phone: { type: String },
                price: { type: Number },
                prevision: { type: String, enum: ["Fonasa", "Isapre"] },
            }),
        },
        buy_code: {
            type: String,
        },
        token: {
            type: String,
        },
        // price: {
        //     type: Number,
        //     required: true,
        // },
        state: {
            type: String,
            enum: ["pendiente", "pagado", "pagando", "cancelado", "bloqueado"],
            required: true,
        },
        blocked: {
            type: Boolean,
            required: true,
        },
        description: {
            type: String,
        },
        token: {
            type: String,
        },
        token: {
            type: String,
            enum: ["Isapre", "Fonasa"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Attention", userSchema);
