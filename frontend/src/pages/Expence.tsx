import { useState, useEffect } from 'react';
import SubscriptionAddForm from '../components/SubscriptionAddForm';
import ExpenseAddForm from '../components/ExpenseAddForm';
import ExpenseList from '../components/ExpenseList';
import SubscriptionList from '../components/SubscriptionList';
import ExpenseViewModel from '../viewModels/ExpenseViewModel';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import { handleErrorResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import ExpenseDto from '../dtos/expense/expenseDto';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';

const ExpensePage = () => {
  const [activeTab, setActiveTab] = useState('expense');
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [subscriptions, setsubscriptions] = useState<SubscriptionDto[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      const result: ExpenseDto[] | ErrorMessage = await new ExpenseViewModel().getExpenses();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setExpenses(result);
      }
    };
    fetchExpenses();

    const fetchSubscriptions = async () => {
      const result: SubscriptionDto[] | ErrorMessage = await new SubscriptionViewModel().getSubscriptions();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setsubscriptions(result);
      }
    };
    fetchSubscriptions();

  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full max-w-md mb-4">
        <div className="w-full sm:hidden">
          <select
            title="Expenses Type"
            id="tabs"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF8343] focus:border-[#FF8343] block w-full p-2.5"
          >
            <option value="expense">Expense</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>
        <div className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
          <button
            onClick={() => setActiveTab('expense')}
            className={`w-1/2 p-4 mr-1 border-r border-gray-200 rounded-s-lg focus:ring-2 focus:ring-[#fcaa7e] focus:outline-none ${
              activeTab === 'expense'
                ? 'text-gray-900 bg-gray-100'
                : 'bg-white hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`w-1/2 p-4 border-r border-gray-200 rounded-e-lg focus:ring-2 focus:ring-[#fcaa7e] focus:outline-none ${
              activeTab === 'subscription'
                ? 'text-gray-900 bg-gray-100'
                : 'bg-white hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Subscription
          </button>
        </div>
      </div>

      <div className="w-full max-w-md">
        {showForm && activeTab === 'expense' && <ExpenseAddForm />}
        {activeTab === 'expense' && (
          <ExpenseList description="No expense added yet." ExpenseList={expenses} />
        )}
        {showForm && activeTab === 'subscription' && <SubscriptionAddForm />}
        {activeTab === 'subscription' && (
          <SubscriptionList description="No subscription added yet." SubscriptionList={subscriptions} />
        )}
      </div>

      <button
        onClick={toggleForm}
        className="mb-4 mt-10 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#FF8343] text-white rounded-lg hover:bg-[#E66D2C] transition-colors"
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
        {showForm ? '' : `Add ${activeTab === 'expense' ? 'Expense' : 'Subscription'}`}
      </button>


    </div>
  );
};

export default ExpensePage;