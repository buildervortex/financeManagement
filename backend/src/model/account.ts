import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import Income, { incomeSchema } from "./income";

interface Account extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    fullName: string,
    userName: string,
    email: string,
    password: string,
    generateAuthToken(): string;
    incomes: Array<Income>;
}

const userSchema = new mongoose.Schema<Account>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    fullName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    userName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    incomes: {
        type: [incomeSchema]
    }
})

userSchema.methods.generateAuthToken = function (): string {
    let payload = { _id: this._id }
    const token = jwt.sign(payload, config.get("jwtSymerticKey"))
    return token;
}

const Account = mongoose.model<Account & mongoose.Document>("Account", userSchema, "Account");
export default Account;