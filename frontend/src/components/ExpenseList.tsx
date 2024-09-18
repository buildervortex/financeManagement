import { FunctionComponent } from 'react';
import ExpenseDto from '../dtos/expense/expenseDto';
import { useNavigate } from 'react-router-dom';

interface ExpenseListProps {
  formName?: string;
  description?: string;
  ExpenseList: ExpenseDto[];
}

const ExpenseList: FunctionComponent<ExpenseListProps> = ({ formName,description,ExpenseList }) => {

  const navigate = useNavigate();

  const handleItemClick = (expense: ExpenseDto) => {
    navigate('/Expense-details', { state: { expense } });
  };

  return (
    <div className="mt-8 w-full max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black border-b pb-2">{formName}</h2>
      {ExpenseList.length > 0 ? (
        <>
          <ul className="space-y-4">
            {ExpenseList.map((expense, index) => (
              <li
              key={index}
              onClick={() => handleItemClick(expense)}
              className="bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">{expense.name}</p>
                </div>
                <p className="text-lg font-bold text-orange-500">
                    {expense.currencyType} {expense.amount?.toFixed(2)}
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

export default ExpenseList;
