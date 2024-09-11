import mongoose from "mongoose";

interface Expense extends mongoose.Document {
    _id: mongoose.ObjectId;
    name: string;
    category?: string;
    description?: string;
    amount: number;
    currencyType: string;
    paymentDate?: Date;
    type: string;
    paid: boolean;
    addtionalIdentifiers: Array<mongoose.ObjectId>;
}

export const expenseSchema = new mongoose.Schema<Expense>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    category: {
        type: String,
        default: "direct"
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    amount: {
        type: Number,
        min: 1
    },
    currencyType: {
        type: String,
        minLength: 2,
        maxLength: 10,
        default: "LKR"
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: "direct"
    },
    paid: {
        type: Boolean,
        required: true
    },
    addtionalIdentifiers: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

const Expense = mongoose.model<Expense & mongoose.Document>("Expense", expenseSchema, "Expense");
export default Expense;