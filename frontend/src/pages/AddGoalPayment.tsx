import React, { useState } from "react";
import AddGoalPaymentDto, { validateAddGoalPaymentDto } from "../dtos/goal/addGoalPaymentDto";

const AddGoalPayment: React.FC = () => {
    const [formData, setFormData] = useState<AddGoalPaymentDto>({
        amount: undefined,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value ? Number(value) : undefined,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = validateAddGoalPaymentDto(formData);
        if (error) {
            const errorMessages: { [key: string]: string } = {};
            error.details.forEach((detail) => {
                errorMessages[detail.path[0]] = detail.message;
            });
            setErrors(errorMessages);
        } else {
            setErrors({});
            console.log("Valid form data:", formData);
            // e.g., call API to save the payment
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-44 mb-48">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Goal Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Enter payment amount"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                        value={formData.amount || ""}
                        onChange={handleChange}
                    />
                    {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-300 transition duration-300"
                >
                    Add Payment
                </button>
            </form>
        </div>
    );
};

export default AddGoalPayment;
