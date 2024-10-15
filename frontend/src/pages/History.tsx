import React, { useEffect, useState } from "react";
import IncomeViewModel from "../viewModels/IncomeViewModel";
import ExpenseViewModel from "../viewModels/ExpenseViewModel";
import GoalViewModel from "../viewModels/GoalsViewModel";
import SubscriptionViewModel from "../viewModels/SubscriptionViewModel";
import SubscriptionDto from "../dtos/subscription/subscriptionDto";
import ExpenseDto from "../dtos/expense/expenseDto";
import GoalDto from "../dtos/goal/goalDto";
import IncomeDto from "../dtos/income/incomeDto";
import ErrorMessage from "../viewModels/error";
import { handleErrorResult } from "../utils/errorMessage";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { format, isAfter,  endOfMonth } from "date-fns";

const History = () => {
  const [incomes, setIncomes] = useState<IncomeDto[]>([]);
  const [goals, setGoals] = useState<GoalDto[]>([]);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState<any[]>([]);

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
        fetchAndSetData(
          () => new IncomeViewModel().getIncomes({ sortBy: "incomeDate" }),
          setIncomes
        ),
        fetchAndSetData(() => new GoalViewModel().getGoals(), setGoals),
        fetchAndSetData(() => new ExpenseViewModel().getExpenses(), setExpenses),
        fetchAndSetData(
          () => new SubscriptionViewModel().getSubscriptions(),
          setSubscriptions
        ),
      ]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalsAndSavings();
    generateChartData();
  }, [incomes, expenses, subscriptions, goals, selectedDate]);

  const calculateTotalsAndSavings = () => {
    const endDate = endOfMonth(selectedDate);

    const totalIncome = incomes.reduce((total, income) => {
      const incomeDate = new Date(income.incomeDate);
      if (isNaN(incomeDate.getTime()) || isAfter(incomeDate, endDate)) {
        return total;
      }
      if (income.monthly) {
        const monthsDiff =
          (endDate.getFullYear() - incomeDate.getFullYear()) * 12 +
          (endDate.getMonth() - incomeDate.getMonth()) +
          1;
        return total + income.amount * monthsDiff;
      }
      return total + income.amount;
    }, 0);

    const totalExpenses = expenses.reduce((total, expense) => {
      const expenseDate = expense.paymentDate ? new Date(expense.paymentDate) : undefined;
      return expense.paid && expenseDate && !isAfter(expenseDate, endDate)
        ? total + (expense.amount || 0)
        : total;
    }, 0);
    const totalSubscriptions = subscriptions.reduce((total, subscription) => {
      if (
        subscription.initialPaymentDate &&
        subscription.amount &&
        subscription.installmentIntervalDays
      ) {
        const initialDate = new Date(subscription.initialPaymentDate);
        if (isNaN(initialDate.getTime()) || isAfter(initialDate, endDate)) {
          return total;
        }

        const completedInstallments = subscription.completedInstallments ?? 0;

        if (subscription.isRecurringIndefinitely) {
          return total + subscription.amount * (completedInstallments + 1);
        } else {
          const totalInstallments = subscription.totalInstallments ?? 0;
          if (completedInstallments >= totalInstallments) {
            return total + subscription.amount * totalInstallments;
          } else {
            return total + subscription.amount * (completedInstallments + 1);
          }
        }
      }
      return total;
    }, 0);

    const totalGoalExpenses = goals.reduce(
      (total, goal) => {
        const goalDate = goal.startDate ? new Date(goal.startDate) : undefined;
        return goalDate && !isAfter(goalDate, endDate) ? total + (goal.currentAmount || 0) : total;
      },
      0
    );

    const savings = totalIncome - totalExpenses - totalSubscriptions - totalGoalExpenses;

    return { totalIncome, totalExpenses, totalSubscriptions, savings };
  };

  const generateChartData = () => {
    const data: any[] = [];
    const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endDate = endOfMonth(selectedDate);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      const dateString = format(currentDate, "yyyy-MM-dd");

      const incomeForDay = incomes.reduce((total, income) => {
        const incomeDate = new Date(income.incomeDate);
        if (income.monthly) {
          if (incomeDate.getDate() === currentDate.getDate()) {
            return total + income.amount;
          }
        } else if (format(incomeDate, "yyyy-MM-dd") === dateString) {
          return total + income.amount;
        }
        return total;
      }, 0);

      const expenseForDay = expenses.reduce((total, expense) => {
        const expenseDate = expense.paymentDate ? new Date(expense.paymentDate) : undefined;
        return expense.paid && expenseDate && format(expenseDate, "yyyy-MM-dd") === dateString
          ? total + (expense.amount || 0)
          : total;
      }, 0);

      const subscriptionForDay = subscriptions.reduce((total, subscription) => {
        if (subscription.initialPaymentDate && subscription.amount) {
          const initialDate = new Date(subscription.initialPaymentDate);
          if (format(initialDate, "yyyy-MM-dd") === dateString) {
            return total + subscription.amount;
          }
        }
        return total;
      }, 0);

      data.push({
        date: dateString,
        income: incomeForDay,
        expense: expenseForDay,
        subscription: subscriptionForDay,
      });
    }

    setChartData(data);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, 1));
  };

  const { totalIncome, totalExpenses, totalSubscriptions, savings } = calculateTotalsAndSavings();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="month-picker" className="mr-2">
          Select Month and Year:
        </label>
        <input
          type="month"
          id="month-picker"
          value={format(selectedDate, "yyyy-MM")}
          onChange={handleDateChange}
          className="border rounded p-1"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-light-blue shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-dark-blue">
            Total Income
          </h3>
          <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-light-orange shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-dark-orange">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold">${(totalExpenses + totalSubscriptions).toFixed(2)}</p>
        </div>
        <div className="bg-light-orange shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-dark-orange">
            Total Goal Allocation
          </h3>
          <p className="text-2xl font-bold">${totalSubscriptions.toFixed(2)}</p>
        </div>
        <div className="bg-light-blue shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-dark-blue">
            Total Saving
          </h3>
          <p className="text-2xl font-bold">${savings.toFixed(2)}</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-2">
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Financial Overview - {format(selectedDate, "MMMM yyyy")}
          </h2>
          <div className="relative">
            <div className="pb-10">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#007BFF" name="Income" />
                  <Line type="monotone" dataKey="expense" stroke="#FFA500" name="Expense" />
                  <Line type="monotone" dataKey="subscription" stroke="#0056b3" name="Subscription" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;