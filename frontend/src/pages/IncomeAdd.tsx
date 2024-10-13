import React, { useState, useEffect } from 'react';
import IncomeList from '../components/IncomeList';
import IncomeViewModel from '../viewModels/IncomeViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import addIncomeDto from '../dtos/income/addIncomeDto';
import IncomeDto from '../dtos/income/incomeDto';

const IncomeAddPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [monthly, setMonthly] = useState<boolean>(false);
  const [incomeDate, setIncomeDate] = useState<number>();
  const [incomes, setIncomes] = useState<IncomeDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchIncomes = async () => {
      const result: IncomeDto[] | ErrorMessage = await new IncomeViewModel().getIncomes({sortBy:"incomeDate"});
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setIncomes(result);
      }
    };
    fetchIncomes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addincomeDto: addIncomeDto = new addIncomeDto();
    addincomeDto.name = name;
    addincomeDto.description = description;
    addincomeDto.amount = amount;
    addincomeDto.monthly = monthly;
    addincomeDto.monthlyDate = incomeDate;
    const result = await new IncomeViewModel().addIncome(addincomeDto)
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Income Added Successfully')
    }

    setName("");
    setDescription("");
    setAmount(0);
    setMonthly(false);

  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mt-6 mb-4">
        <IncomeList
          description='No income added yet.'
          incomeList={incomes}
        />
      </div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#FF8343] text-white rounded-lg hover:bg-[#E66D2C] transition-colors"
      >
        <span className="w-5 h-5 inline-flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            {showForm ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            )}
          </svg>
        </span>
        {showForm ? '' : 'Add Income'}
      </button>
  
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Add Income Information</h2>
          
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Income</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Your Income"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Description"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Amount"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="monthly"
              checked={monthly}
              onChange={(e) => setMonthly(e.target.checked)}
              className="mx-3 mr-2 leading-tight"
            />
            <label htmlFor="monthly" className="text-sm font-bold text-gray-700">Monthly</label>
          </div>

          {monthly && (
            <div>
              <label htmlFor="incomeDate" className="block text-gray-700 text-sm font-bold mb-2">Income Date</label>
              <input
                type="number"
                id="incomeDate"
                value={incomeDate}
                onChange={(e) => setIncomeDate(parseInt(e.target.value))}
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Income date"
              />
            </div>
          )}

        

          <button
            type="submit"
            className="w-full bg-[#FF8343] hover:bg-[#E66D2C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default IncomeAddPage;