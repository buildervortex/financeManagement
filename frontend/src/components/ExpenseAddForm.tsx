import React, { FunctionComponent, useState } from "react";
import ExpenseViewModel from "../viewModels/ExpenseViewModel";
import { handleErrorResult, handleSuccessResult } from "../utils/errorMessage";
import ErrorMessage from "../viewModels/error";
import addExpenseDto from "../dtos/expense/addExpenseDto";

interface AddExpenseProps {}

const ExpenseAddForm: FunctionComponent<AddExpenseProps> = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [paid, setPaid] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const AddExpenseDto: addExpenseDto = new addExpenseDto();
    AddExpenseDto.name = name;
    AddExpenseDto.category = category;
    AddExpenseDto.description = description;
    AddExpenseDto.amount = amount;
    AddExpenseDto.paid = paid;
    const result = await new ExpenseViewModel().addExpense(AddExpenseDto);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Expense Added Successfully')
    }

    setName("");
    setCategory("");
    setDescription("");
    setAmount(0);
    setPaid(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
            Add Expense Information
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Expense Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Expense Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="paid"
                id="paid"
                className="mx-3 mr-2 leading-tight"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
              />
              <label htmlFor="paid" className="text-sm font-medium text-gray-900">Paid</label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAddForm;