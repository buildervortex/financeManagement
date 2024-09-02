import mongoose from "mongoose";

interface Investment extends mongoose.Document {
    _id: mongoose.ObjectId;
    name: string;
    description: string;
    amount: number;
    incomeDate: Date;
    currencyType: string;
    monthly: boolean;
    monthlyDate?: number;
}

const investmentSchema = new mongoose.Schema<Investment>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    amount: {
        type: Number,
        min: 0
    },
    incomeDate: {
        type: Date,
        required: true
    },
    currencyType: {
        type: String,
        minLength: 1,
        maxLength: 20
    },
    monthly: {
        type: Boolean
    },
    monthlyDate: {
        type: Date
    }
})

const Investment = mongoose.model<Investment & mongoose.Document>("Investment", investmentSchema, "Investment");
export default Investment;