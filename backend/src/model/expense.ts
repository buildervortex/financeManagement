import mongoose from "mongoose";

interface Expense extends mongoose.Document {
    _id: mongoose.ObjectId;
    name: string;
    category: string;
    description: string;
    amount: number;
    paymentDate: Date;
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
    paymentDate: {
        type: Date,
    },
    type: {
        type: String,
        required: true
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