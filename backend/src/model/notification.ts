import mongoose from "mongoose";

interface Notification extends mongoose.Document {
    _id: mongoose.ObjectId;
    content: string;
    date: Date;
    read: boolean;
    type: string;
}

export const notificationSchema = new mongoose.Schema<Notification>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    date: {
        type: Date
    },
    read: {
        type: Boolean
    },
    type: {
        type: String,
        required: true
    }
})

const Notification = mongoose.model<Notification & mongoose.Document>("Notification", notificationSchema, "Notification");
export default Notification;