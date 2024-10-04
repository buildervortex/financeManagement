import { useState, useEffect } from 'react';
import ExpenseAddForm from '../components/ExpenseAddForm';
import SubscriptionAdd from '../components/SubscriptionAddForm';
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
  const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const result = await new ExpenseViewModel().getExpenses();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setExpenses(result);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const result = await new SubscriptionViewModel().getSubscriptions();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setSubscriptions(result);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Column - Lists */}
      <div className="w-full md:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-4">
          {activeTab === 'expense' ? (
            <ExpenseList
              formName="Expenses"
              description="No expenses added yet."
              ExpenseList={expenses}
            />
          ) : (
            <SubscriptionList
              formName="Subscriptions"
              description="No subscriptions added yet."
              SubscriptionList={subscriptions}
            />
          )}
        </div>
      </div>

      {/* Right Column - Tab View and Forms */}
      <div className="w-full md:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="sm:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              >
                <option value="expense">Expense</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>

            <div className="hidden sm:flex rounded-md">
              <button
                onClick={() => setActiveTab('expense')}
                className={`flex-1 py-2 px-4 rounded-l-md ${
                  activeTab === 'expense'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Expense
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                className={`flex-1 py-2 px-4 rounded-r-md ${
                  activeTab === 'subscription'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Subscription
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="mt-4">
            {activeTab === 'expense' ? <ExpenseAddForm /> : <SubscriptionAdd />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;