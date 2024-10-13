import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoalViewModel from "../viewModels/GoalsViewModel";
import AddGoalPaymentDto from "../dtos/goal/addGoalPaymentDto";
import GoalDto from "../dtos/goal/goalDto";
import { handleErrorResult, handleSuccessResult } from "../utils/errorMessage";
import ErrorMessage from "../viewModels/error";

interface LocationState {
  goal: GoalDto;
}

const AddGoalPayment: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { goal } = (location.state as LocationState) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const goalId = goal?.id ?? "";
    const addGoalPaymentDto = new AddGoalPaymentDto();
    addGoalPaymentDto.amount = amount;

    const result = await new GoalViewModel().addGoalPayment(
      addGoalPaymentDto,
      goalId
    );

    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult("Goal Payment Added Successfully");
      navigate("/addGoal");
    }
    setAmount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
            Add Goal Payment
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
                Goal Payment Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Goal Payment Amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#FF8343] hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGoalPayment;