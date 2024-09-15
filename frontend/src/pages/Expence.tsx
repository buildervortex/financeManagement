import { useState } from 'react';
import ExpenseAdd from '../components/ExpenseAdd';
import SubscriptionAdd from '../components/SubscriptionAdd';

const ExpensePage = () => {
  const [activeTab, setActiveTab] = useState('expense');

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
        <div className="sm:hidden w-full">
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
            className={`w-1/2 p-4 border-r border-gray-200 rounded-s-lg focus:ring-4 focus:ring-[#fcaa7e] focus:outline-none ${
              activeTab === 'expense'
                ? 'text-gray-900 bg-gray-100'
                : 'bg-white hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`w-1/2 p-4 border-r border-gray-200 rounded-e-lg focus:ring-4 focus:ring-[#fcaa7e] focus:outline-none ${
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
        {activeTab === 'expense' && <ExpenseAdd />}  
        {activeTab === 'subscription' && <SubscriptionAdd />}
      </div>
    </div>
  );
};

export default ExpensePage;