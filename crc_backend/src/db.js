import mongoose from "mongoose";
import { defaultAdminUser } from "./controllers/users.controller.js";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/crc_kinesiologia");
        console.log("DB is connected");

        await defaultAdminUser();
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
