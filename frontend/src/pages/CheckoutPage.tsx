import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

interface IncomeEntry {
  name: string;
  description: string;
  amount: number;
  monthly: boolean;
  incomeDate: string;
  currencyType: string;
}

interface LocationState {
  incomeList: IncomeEntry[];
}

const CheckoutPage: FunctionComponent = () => {
  const location = useLocation();
  const { incomeList } = location.state as LocationState;

  return (
    <div className="p-6 w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout Summary</h1>
      {incomeList.length > 0 ? (
        <ul className="space-y-4">
          {incomeList.map((income, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {income.name}</p>
              <p><strong>Description:</strong> {income.description}</p>
              <p><strong>Amount:</strong> ${income.amount.toFixed(2)}</p>
              <p><strong>Monthly:</strong> {income.monthly ? "Yes" : "No"}</p>
              <p><strong>Income Date:</strong> {income.incomeDate || 'N/A'}</p>
              <p><strong>Currency Type:</strong> {income.currencyType}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No incomes to display.</p>
      )}
    </div>
  );
};

export default CheckoutPage;
