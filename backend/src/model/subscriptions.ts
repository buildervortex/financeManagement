import mongoose from "mongoose";

interface Subscription extends mongoose.Document {
    _id: mongoose.ObjectId;
    name: string;
    category: string;
    description?: string;
    amount: number;
    currencyType: string;
    nextInstallmentDate?: Date;
    lastPaymentDate: Date;
    initialPaymentDate: Date;
    installmentIntervalDays: number;
    isRecurringIndefinitely: boolean;
    totalInstallments: number;
    remindBeforeDays: number;
    completedInstallments: number;
}

export const subscriptionSchema = new mongoose.Schema<Subscription>({
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
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    currencyType: {
        type: String,
        minLength: 2,
        maxLength: 10,
    },
    nextInstallmentDate: {
        type: Date
    },
    lastPaymentDate: {
        type: Date
    },
    initialPaymentDate: {
        type: Date,
        required: true,
    },
    installmentIntervalDays: {
        type: Number,
        min: 1,
        required: true
    },
    isRecurringIndefinitely: {
        type: Boolean,
        validate: {
            validator: function (value) {
                return !(value && this.totalInstallments);
            }
        },
        message: "Cannot set repeat always to true if a repeat count is provided."
    },
    totalInstallments: {
        type: Number,
        min: 1,
        validate: {
            validator: function (value) {
                return !this.isRecurringIndefinitely;
            },
            message: "Bot the repeat count and repeat always cannot be used at the same time"
        }
    },
    remindBeforeDays: {
        type: Number,
        min: 0,
        validate: {
            validator: function (value) {
                return value < this.installmentIntervalDays;
            },
            message: "Reminder days must be less than the installment interval days."
        }
    },
    completedInstallments: {
        type: Number,
        min: 0,
        validate: {
            validator: function (value) {
                return value <= this.totalInstallments;
            },
            message: "Completed installments cannot exceed total installments."
        }
    }

})

subscriptionSchema.index({ nextInstallmentDate: 1 })
const Subscription = mongoose.model<Subscription & mongoose.Document>("Subscription", subscriptionSchema, "Subscription");
export default Subscription;