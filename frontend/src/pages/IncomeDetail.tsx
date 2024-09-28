import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IncomeDto from '../dtos/income/incomeDto';
import ErrorMessage from '../viewModels/error';
import { handleErrorResult } from '../utils/errorMessage';
import IncomeViewModel from '../viewModels/IncomeViewModel';

interface LocationState {
  income: IncomeDto;
}

const CheckoutPage: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { income } = location.state as LocationState;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
  };

  const handleUpdateClick = () => {
    navigate('/updateincome', { state: { income } });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteIncome = async () => {
    const result: IncomeDto | ErrorMessage = await new IncomeViewModel().DeleteIncome(income.id);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      navigate('/addIncome');
    }
    closeModal();
  };

  return (
    <div className="w-full max-w-2xl p-8 m-10 mx-auto mt-10 rounded-lg shadow-xl bg-gray-50">
      <h1 className="px-4 mb-3 text-2xl text-center text-gray-900 ">INCOME DETAILS</h1>
      <div className="p-4 ">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Income Name:</p>
          <p className="text-xl text-gray-600">{income.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Description:</p>
          <p className="text-lg text-gray-600">{income.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Amount:</p>
          <p className="text-xl text-gray-600">{income.currencyType} {income.amount.toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Monthly:</p>
          <p className={`text-xl ${income.monthly ? 'text-green-600' : 'text-red-600'}`}>
            {income.monthly ? "Yes" : "No"}
          </p>
          </div>
          {income.monthly ? (
            <div className="mb-4">
            <p className="text-lg font-medium text-gray-900">Income Date:</p> 
            <p className="text-xl text-gray-600">{income.monthlyDate}</p></div>
          ) : null}
        
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Created Date:</p>
          <p className="text-xl text-gray-600">{formatDate(income.incomeDate)}</p>
        </div>
        <div className="items-center mt-6">
          <div className='flex items-center gap-x-4'>
            <button
              onClick={handleUpdateClick}
              className="my-2 px-4 py-2 border border-[#FF8343] bg-[#FF8343] text-white rounded-md hover:bg-[#fd8b53]"
            >
              Update Income
            </button><br />
            <button
              onClick={handleDeleteClick}
              className="px-5 py-2 border border-[#FF8343] text-[#FF8343] rounded-md hover:bg-gray-300">
              Delete Income
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50" onClick={closeModal}>
          <div
            className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <p className="mb-4 text-gray-600">Are you sure you want to delete this income entry?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteIncome}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
