import mongoose from "mongoose";
import Subscription from "../model/subscriptions";

export function isObjectIdValid(objectId: string) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

