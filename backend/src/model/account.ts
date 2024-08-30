import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

interface Account extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    userName: string,
    email: string,
    password: string,
    generateAuthToken():string;
}

const userSchema = new mongoose.Schema<Account>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    userName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.methods.generateAuthToken = function (): string {
    let payload = { _id: this._id }
    const token = jwt.sign(payload, config.get("jwtSymerticKey"))
    return token;
}

const Account = mongoose.model<Account & mongoose.Document>("Account", userSchema, "Account");
export default Account;