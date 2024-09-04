import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface IncomeEntry {
  name: string;
  description: string;
  amount: number;
  monthly: boolean;
  incomeDate: string;
  currencyType: string;
}

interface IncomeListProps {
  incomeList: IncomeEntry[];
}

const IncomeList: FunctionComponent<IncomeListProps> = ({ incomeList }) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout', { state: { incomeList } });
  };

  return (
    <div className="mt-6 w-full md:w-1/2 lg:w-1/3 p-4">
      <h2 className="text-lg font-bold mb-4 text-[#FF8343]">Summary</h2>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
        {incomeList.length > 0 ? (
          <>
            <ul className="space-y-4">
              {incomeList.map((income, index) => (
                <li key={index} className="w-full">
                  <p className="text-sm px-4 lg:px-6">
                    <strong className="mr-2 lg:mr-10">Name:</strong>
                    {income.name}
                  </p>
                  <p className="text-sm px-4 lg:px-6">
                    <strong className="mr-2 lg:mr-5">Amount:</strong> ${income.amount.toFixed(2)}
                  </p>
                  <p className="text-sm px-4 lg:px-6">
                    <strong className="mr-2 lg:mr-5">Monthly:</strong> {income.monthly ? 'Yes' : 'No'}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                onClick={handleCheckoutClick}
                className="p-2 px-4 mt-4 border border-[#FF8343] rounded-3xl hover:bg-[#fd9b6a] hover:text-white"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No incomes added yet.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
