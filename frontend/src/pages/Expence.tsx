import { useState } from 'react';
import ExpenseAdd from '../components/ExpenseAdd';
import SubscriptionAdd from '../components/SubscriptionAdd';


const ExpensePage = () => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');

  return (
    <div className="w-full p-4">
      <div className="flex justify-center space-x-4 mb-2">
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 rounded-3xl font-semibold ${activeTab === 'income' ? 'bg-[#FF8343] text-white' : 'bg-gray-300'}`}
        >
          Expense
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-4 py-2 rounded-3xl font-semibold ${activeTab === 'expense' ? 'bg-[#FF8343] text-white' : 'bg-gray-300'}`}
        >
          Subscription
        </button>
      </div>
      <div className="tab-content">
      <div className="sm:hidden">
    <label className="sr-only">Select your country</label>
    <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option>Expense</option>
        <option>Subscription</option>
    </select>
</div>
<ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
    <li className="w-full focus-within:z-10">
        <a href="#" className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Profile</a>
    </li>
    <li className="w-full focus-within:z-10">
        <a href="#" className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Dashboard</a>
    </li>
</ul>

        {activeTab === 'income' && <ExpenseAdd />}  
        {activeTab === 'expense' && <SubscriptionAdd />}
      </div>
    </div>
  );
};

export default ExpensePage;
