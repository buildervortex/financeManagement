import { useState } from 'react';
import ExpenseAdd from '../components/ExpenseAdd';
import SubscriptionAdd from '../components/SubscriptionAdd';
// import IncomeAddPage from './IncomeAddPage';
// import ExpenseAddPage from './ExpenseAddPage'; 

const ExpensePage = () => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 font-bold ${activeTab === 'income' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-4 py-2 font-bold ${activeTab === 'expense' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Expense
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'income' && <ExpenseAdd />}  {/* Show Income Form */}
        {activeTab === 'expense' && <SubscriptionAdd />}  {/* Show Expense Form */}
      </div>
    </div>
  );
};

export default ExpensePage;
