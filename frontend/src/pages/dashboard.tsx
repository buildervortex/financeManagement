import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import IncomeViewModel from '../viewModels/IncomeViewModel';
import ExpenseViewModel from '../viewModels/ExpenseViewModel';
import GoalViewModel from '../viewModels/GoalsViewModel';
import NotificationViewModel from '../viewModels/NotificationViewModel';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import NotificationDto from '../dtos/notification/notification';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';
import ExpenseDto from '../dtos/expense/expenseDto';
import GoalDto from '../dtos/goal/goalDto';
import IncomeDto from '../dtos/income/incomeDto';
import ErrorMessage from '../viewModels/error';
import { handleErrorResult } from '../utils/errorMessage';

const Dashboard = () => {
  const [incomes, setIncomes] = useState<IncomeDto[]>([]);
  const [goals, setGoals] = useState<GoalDto[]>([]);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [totalGoalExpenses, setTotalGoalExpenses] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchAndSetData = async <T,>(
        fetchFunction: () => Promise<T[] | ErrorMessage>,
        setStateFunction: React.Dispatch<React.SetStateAction<T[]>>
      ) => {
        const result = await fetchFunction();
        if (!(result instanceof ErrorMessage)) {
          setStateFunction(result);
        } else {
          handleErrorResult(result);
        }
      };

      await Promise.all([
        fetchAndSetData(new IncomeViewModel().getIncomes, setIncomes),
        fetchAndSetData(new GoalViewModel().getGoals, setGoals),
        fetchAndSetData(new ExpenseViewModel().getExpenses, setExpenses),
        fetchAndSetData(new SubscriptionViewModel().getSubscriptions, setSubscriptions),
        fetchAndSetData(new NotificationViewModel().getNotifications, setNotifications),
      ]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalIncome = () => {
      const today = new Date();
      return incomes.reduce((total, income) => {
        if (income.monthly) {
          const incomeDate = new Date(income.incomeDate);
          if (isNaN(incomeDate.getTime())) {
            console.error(`Invalid date for income: ${income.id}`);
            return total;
          }
          const monthsDiff = (today.getFullYear() - incomeDate.getFullYear()) * 12 +
            (today.getMonth() - incomeDate.getMonth());
          return total + (income.amount * (monthsDiff + 1));
        }
        return total + income.amount;
      }, 0);
    };

    const calculateTotalExpenses = () => {
      return expenses.reduce((total, expense) => {
        return expense.paid ? total + (expense.amount || 0) : total;
      }, 0);
    };

    const calculateTotalSubscriptions = () => {
      return subscriptions.reduce((total, subscription) => {
        if (subscription.lastPaymentDate && subscription.initialPaymentDate && subscription.amount) {
          const lastPaymentDate = new Date(subscription.lastPaymentDate);
          const initialPaymentDate = new Date(subscription.initialPaymentDate);
          if (isNaN(lastPaymentDate.getTime()) || isNaN(initialPaymentDate.getTime())) {
            console.error(`Invalid date for subscription: ${subscription.id}`);
            return total;
          }
          const monthsDiff = (lastPaymentDate.getFullYear() - initialPaymentDate.getFullYear()) * 12 +
            (lastPaymentDate.getMonth() - initialPaymentDate.getMonth());
          return total + (subscription.amount * (monthsDiff + 1));
        }
        return total;
      }, 0);
    };

    const calculateTotalGoalExpenses = () => {
      return goals.reduce((total, goal) => total + (goal.currentAmount || 0), 0);
    };

    setTotalIncome(calculateTotalIncome());
    setTotalExpenses(calculateTotalExpenses());
    setTotalSubscriptions(calculateTotalSubscriptions());
    setTotalGoalExpenses(calculateTotalGoalExpenses());
  }, [incomes, expenses, subscriptions, goals]);

  const COLORS = ['#007BFF', '#FFA500', '#0056b3', '#CC7A00'];

  const overviewData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses },
    { name: 'Subscriptions', value: totalSubscriptions },
    { name: 'Goal Expenses', value: totalGoalExpenses },
  ];

  const expenseCategories = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + (expense.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  const expenseCategoryData = Object.entries(expenseCategories).map(([name, value]) => ({ name, value }));

  const goalProgress = goals.map(goal => ({
    name: goal.name || 'Unnamed Goal',
    currentAmount: goal.currentAmount || 0,
    remainingAmount: (goal.targetAmount || 0) - (goal.currentAmount || 0),
  }));

  const saving = totalIncome > 0 ? (totalIncome - totalExpenses - totalSubscriptions): 0;

  return (
<div className="p-6 min-h-screen bg-light-blue">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-light-blue shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-dark-blue">Total Income</h3>
          <p className="text-2xl font-bold text-[#007BFF]">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-light-orange shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-dark-orange">Total Expenses</h3>
          <p className="text-2xl font-bold ">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-light-orange shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-dark-orange">Total Subscriptions</h3>
          <p className="text-2xl font-bold ">${totalSubscriptions.toFixed(2)}</p>
        </div>
        <div className="bg-light-blue shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-dark-blue">Total Saving</h3>
          <p className="text-2xl font-bold text-[#007BFF]">${saving.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Overview Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={overviewData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {overviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Categories Donut Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Expense Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Progress Stacked Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Goal Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={goalProgress}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="currentAmount" stackId="a" fill={COLORS[0]} />
              <Bar dataKey="remainingAmount" stackId="a" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;