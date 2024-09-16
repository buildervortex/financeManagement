import { FunctionComponent } from 'react';
import IncomeDto from '../dtos/income/incomeDto';
import { useNavigate } from 'react-router-dom';

interface IncomeListProps {
  formName?: string;
  description?: string;
  incomeList: IncomeDto[];
}

const IncomeList: FunctionComponent<IncomeListProps> = ({ formName,description,incomeList }) => {

  const navigate = useNavigate();

  const handleItemClick = (income: IncomeDto) => {
    navigate('/Income-details', { state: { income } });
  };

  return (
    <div className="mt-8 w-full max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black border-b pb-2">{formName}</h2>
      {incomeList.length > 0 ? (
        <>
          <ul className="space-y-4">
            {incomeList.map((income, index) => (
              <li
              key={income.id || index}
              onClick={() => handleItemClick(income)}
              className="bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">{income.name}</p>
                </div>
                <p className="text-lg font-bold text-orange-500">
                    {income.currencyType} {income.amount.toFixed(2)}
                  </p>
              </div>
            </li>
            ))}
          </ul>
          
        </>
      ) : (
        <p className="text-gray-500 text-center py-6">{description}</p>
      )}
    </div>
  );
};

export default IncomeList;
