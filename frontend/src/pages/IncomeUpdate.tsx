import { FunctionComponent, useState, useEffect } from "react";
import IncomeViewModel from "../viewModels/IncomeViewModel";
import { handleErrorResult, handleSuccessResult } from "../utils/errorMessage";
import ErrorMessage from "../viewModels/error";
import updateIncomeDto from "../dtos/income/updateIncomeDto";
import IncomeDto from "../dtos/income/incomeDto";
import { useLocation } from "react-router-dom";

interface updateIncomePageProps {}

interface LocationState {
  income: IncomeDto;
}

const IncomeUpdatePage: FunctionComponent<updateIncomePageProps> = () => {
  const location = useLocation();
  const { income } = location.state as LocationState;

  const [name, setName] = useState<string>(income.name);
  const [description, setDescription] = useState<string>(income.description);
  const [amount, setAmount] = useState<number>(income.amount);
  const [monthly, setMonthly] = useState<boolean>(income.monthly);
  const [incomeDate, setIncomeDate] = useState<number>(income.monthlyDate ?? 0);

  useEffect(() => {
    setName(income.name);
    setDescription(income.description);
    setAmount(income.amount);
    setMonthly(income.monthly);
    setIncomeDate(income.monthlyDate ?? 0);
  }, [income]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateincomeDto: updateIncomeDto = new updateIncomeDto();
    updateincomeDto.name = name;
    updateincomeDto.description = description;
    updateincomeDto.amount = amount;
    updateincomeDto.monthly = monthly;
    updateincomeDto.monthlyDate = incomeDate;

    const result = await new IncomeViewModel().updateIncome(
      updateincomeDto,
      income.id || ""
    );
    
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult("Income Updated Successfully");
    }

    // Clear the form fields
    setName("");
    setDescription("");
    setAmount(0);
    setMonthly(false);
    setIncomeDate(0);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
            Update Income Information
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Description"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Amount"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="monthly"
                name="monthly"
                checked={monthly}
                onChange={(e) => setMonthly(e.target.checked)}
                className="mx-3 mr-2 leading-tight"
              />
              <label
                htmlFor="monthly"
                className="text-sm font-medium text-gray-900"
              >
                Monthly
              </label>
            </div>
            {monthly && (
              <div>
                <label
                  htmlFor="incomeDate"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Income Date
                </label>
                <input
                  type="date"
                  id="incomeDate"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const dayOfMonth = selectedDate.getDate();
                    setIncomeDate(dayOfMonth);
                  }}
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                />
              </div>
            )}

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

export default IncomeUpdatePage;
