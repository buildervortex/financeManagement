import mongoose from "mongoose";

interface Income extends mongoose.Document {
    _id: mongoose.ObjectId;
    name: string;
    description: string;
    amount: number;
    incomeDate: Date;
    currencyType: string;
    monthly: boolean;
    monthlyDate?: number;
}

const incomeSchema = new mongoose.Schema<Income>({
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
        default: Date.now
    },
    currencyType: {
        type: String,
        minLength: 2,
        maxLength: 10
    },
    monthly: {
        type: Boolean,
        required: true
    },
    monthlyDate: {
        type: Number,
        min: 0,
        max: 31,
        validate: {
            validator: function (value) {
                if (this.monthly && !value) {
                    return false;
                }
                return true;
            },
            message: "monthlyDate is required when monthly is true"
        }
    }
})

const Income = mongoose.model<Income & mongoose.Document>("Investment", incomeSchema, "Investment");
export default Income;