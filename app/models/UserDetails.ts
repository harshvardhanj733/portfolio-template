import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserDetailsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const UserDetails = mongoose.models.UserDetails || mongoose.model("UserDetails", UserDetailsSchema);

export { UserDetails };