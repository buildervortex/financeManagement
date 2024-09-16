import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import Income, { incomeSchema } from "./income";
import Expense, { expenseSchema } from "./expense";
import Subscription, { subscriptionSchema } from "./subscriptions";
import Goal, { goalSchema } from "./goal";

interface Account extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    fullName: string,
    userName: string,
    email: string,
    password: string,
    generateAuthToken(): string;
    incomes: Array<Income>;
    expenses: Array<Expense>;
    subscriptions: Array<Subscription>;
    goals: Array<Goal>;
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
    },
    expenses: {
        type: [expenseSchema]
    },
    subscriptions: {
        type: [subscriptionSchema]
    },
    goals: {
        type: [goalSchema]
    }
})

userSchema.methods.generateAuthToken = function (): string {
    let payload = { _id: this._id }
    const token = jwt.sign(payload, config.get("jwtSymerticKey"))
    return token;
}

const Account = mongoose.model<Account & mongoose.Document>("Account", userSchema, "Account");
export default Account;