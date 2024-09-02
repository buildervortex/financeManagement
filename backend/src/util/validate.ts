import mongoose from "mongoose";

export function isObjectIdValid(objectId: string) {
    return mongoose.Types.ObjectId.isValid(objectId);
}