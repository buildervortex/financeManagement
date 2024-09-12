import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IncomeDto from '../dtos/income/incomeDto';

interface LocationState {
  income: IncomeDto;
}

const CheckoutPage: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { income } = location.state as LocationState;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
  };

  const handleUpdateClick = () => {
    navigate('/updateincome', { state: { income } });
  };

  return (
    <div className="m-10 p-8 w-full max-w-2xl mx-auto bg-gray-50 shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">Income Details</h1>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Name:</p>
          <p className="text-xl text-gray-600 font-semibold">{income.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Description:</p>
          <p className="text-lg text-gray-600 font-semibold">{income.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Amount:</p>
          <p className="text-xl text-gray-600 font-semibold">{income.currencyType} {income.amount.toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Monthly:</p>
          <p className={`text-xl font-semibold ${income.monthly ? 'text-green-600' : 'text-red-600'}`}>
            {income.monthly ? "Yes" : "No"}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Income Date:</p>
          <p className="text-xl text-gray-600 font-semibold">{formatDate(income.incomeDate)}</p>
        </div>
        <div className="mt-6">
          <button 
            onClick={handleUpdateClick} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
