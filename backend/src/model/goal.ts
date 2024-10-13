import mongoose from "mongoose";

interface Goal extends mongoose.Document {
    _id: mongoose.ObjectId;
    name: string;
    description?: string;
    targetAmount: number;
    currentAmount: number;
    startDate: Date;
    deadline?: Date;
    lastPaymentDate?: Date;
    isAchieved: boolean;
    remindBeforeDays?: number;
    incomesIds: Array<mongoose.ObjectId>;
}


export const goalSchema = new mongoose.Schema<Goal>({
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
    description: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    targetAmount: {
        type: Number,
        min: 1,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true,
        min: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        validate: {
            validator: function (value) {
                if (!value) return true;
                return !this.startDate || value >= this.startDate;
            },
            message: "Deadline must be greater than or equal to the startDate."
        }
    },
    lastPaymentDate: {
        type: Date
    },
    isAchieved: {
        type: Boolean,
        required: true
    },
    remindBeforeDays: {
        type: Number,
        validate: {
            validator: function (value) {
                if (!this.deadline || !this.startDate) {
                    return false;
                }

                const duration = (this.deadline.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24);
                return value < duration;
            },
            message: "remindBeforeDays should be less than or equal to the difference between deadline and startDate."
        }
    },
    incomesIds: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }]
    }
})

goalSchema.index({ targetAmount: 1 })
const Goal = mongoose.model<Goal & mongoose.Document>("Goal", goalSchema, "Goal");


export default Goal;