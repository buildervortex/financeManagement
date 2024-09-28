import React, { useState } from "react";
import UpdateGoalDto, { validateUpdateGoalDto } from "../dtos/goal/updateGoalDto";

const UpdateGoal: React.FC = () => {
    const [formData, setFormData] = useState<UpdateGoalDto>({
        name: "",
        description: "",
        currencyType: "LKR",
        remindBeforeDays: undefined,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = validateUpdateGoalDto(formData);
        if (error) {
            const errorMessages: { [key: string]: string } = {};
            error.details.forEach((detail) => {
                errorMessages[detail.path[0]] = detail.message;
            });
            setErrors(errorMessages);
        } else {
            setErrors({});
            console.log("Valid form data:", formData);
            // e.g., call API to update the goal
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Goal</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter goal name"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                        value={formData.name || ""}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter goal description"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                        value={formData.description || ""}
                        onChange={handleChange}
                    />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="currencyType" className="block text-gray-700">Currency Type</label>
                    <input
                        type="text"
                        id="currencyType"
                        name="currencyType"
                        placeholder="Enter currency type"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                        value={formData.currencyType || "LKR"}
                        onChange={handleChange}
                    />
                    {errors.currencyType && <span className="text-red-500 text-sm">{errors.currencyType}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="remindBeforeDays" className="block text-gray-700">Remind Before (Days)</label>
                    <input
                        type="number"
                        id="remindBeforeDays"
                        name="remindBeforeDays"
                        placeholder="Enter days before reminder"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                        value={formData.remindBeforeDays || ""}
                        onChange={handleChange}
                    />
                    {errors.remindBeforeDays && <span className="text-red-500 text-sm">{errors.remindBeforeDays}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-300 transition duration-300 mt-4 mb-4"
                >
                    Update Goal
                </button>
            </form>
        </div>
    );
};

export default UpdateGoal;
