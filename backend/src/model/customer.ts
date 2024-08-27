import Joi from "joi";
import mongoose from "mongoose";

export interface CustomerModel {
    name: string;
    age: number;
    phone: string;
    email: string;
}

export function validateCustomer(customer: CustomerModel): Joi.ValidationResult<any> {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(255).required(),
        age: Joi.number().min(18).required(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string().required()
    })

    return schema.validate(customer);
}

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const Customer = mongoose.model("Customer", customerSchema, "Customer")

export default Customer;