import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { FaRobot } from "react-icons/fa";
import Api from "../services/api";

interface AiResponse {
  message: string;
}

const Chatbot: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [savingsMessage, setSavingsMessage] = useState("");
  const location = useLocation();

  const [incomes, setIncomes] = useState<IncomeDto[]>([]);
  const [goals, setGoals] = useState<GoalDto[]>([]);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
  const [expensePercentage, setExpensePercentage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // Timer ID state
  const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);

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

    const url = location.pathname;
    const containsKeywords = /goal|expense|subscription/i.test(url);

    if (containsKeywords) {
      fetchData();
      setTooltipVisible(true);
    } else {
      setTooltipVisible(false);
    }
  }, [location]);

  useEffect(() => {
    const calculateTotalsAndSavings = () => {
      const today = new Date();

      const totalIncome = incomes.reduce((total, income) => {
        if (income.monthly) {
          const incomeDate = new Date(income.incomeDate);
          if (isNaN(incomeDate.getTime())) {
            console.error(`Invalid date for income: ${income.id}`);
            return total;
          }
          const monthsDiff =
            (today.getFullYear() - incomeDate.getFullYear()) * 12 +
            (today.getMonth() - incomeDate.getMonth());
          return total + income.amount * (monthsDiff + 1);
        }
        return total + income.amount;
      }, 0);

      const totalExpenses = expenses.reduce((total, expense) => {
        return expense.paid ? total + (expense.amount || 0) : total;
      }, 0);

      const totalSubscriptions = subscriptions.reduce((total, subscription) => {
        if (
          subscription.initialPaymentDate &&
          subscription.amount &&
          subscription.installmentIntervalDays
        ) {
          const initialDate = new Date(subscription.initialPaymentDate);
          if (isNaN(initialDate.getTime())) {
            console.error(`Invalid date for subscription: ${subscription.id}`);
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
        (total, goal) => total + (goal.currentAmount || 0),
        0
      );

      const savings = totalIncome - totalExpenses - totalSubscriptions - totalGoalExpenses;

      const calculatedExpensePercentage =
        totalIncome > 0
          ? ((totalExpenses + totalSubscriptions + totalGoalExpenses) / totalIncome) * 100
          : 0;

      setExpensePercentage(calculatedExpensePercentage);
      setSavingsMessage(`You have $${savings.toFixed(2)} left to spend.`);
    };

    calculateTotalsAndSavings();
  }, [incomes, expenses, subscriptions, goals]);

  const getButtonColor = () => {
    if (expensePercentage > 60) {
      return "bg-red-500"; // Danger color
    } else if (expensePercentage > 30) {
      return "bg-orange-500"; // Warning color
    } else {
      return "bg-blue-500"; // Safe color
    }
  };

  const expenseCategories = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + (expense.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  const subscriptionCategories = subscriptions.reduce((acc, subscription) => {
    const category = subscription.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + (subscription.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  const subscriptionCategoryData = Object.entries(subscriptionCategories).map(
    ([name, value]) => ({ name, value })
  );

  const expenseCategoryData = Object.entries(expenseCategories).map(
    ([name, value]) => ({ name, value })
  );

  const handleAskAi = async () => {
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => {
      return total + (expense.paid ? (expense.amount ?? 0) : 0);
    }, 0);      
    const totalSubscriptions = subscriptions.reduce((total, subscription) => {
      return total + (subscription.amount ?? 0);
    }, 0);
    const totalGoalExpenses = goals.reduce((total, goal) => total + (goal.currentAmount || 0), 0);
    
    const prompt = `You are a professional financial manager. Here are the details of my finances:\n\n` +
    `Total Income: $${totalIncome.toFixed(2)}\n` +
    `Total Expenses: $${totalExpenses.toFixed(2)}\n` +
    `Total Subscriptions: $${totalSubscriptions.toFixed(2)}\n` +
    `Total Goal Expenses: $${totalGoalExpenses.toFixed(2)}\n` +
    `Expense Percentage: ${expensePercentage.toFixed(2)}%\n\n` +
    `Expense Categories:\n` +
    expenseCategoryData.map(({ name, value }) => `${name}: $${value}`).join('\n') + `\n\n` +
    `Subscription Categories:\n` +
    subscriptionCategoryData.map(({ name, value }) => `${name}: $${value}`).join('\n') + `\n\n` +
    `Please provide suggestions on how to improve my financial situation.`;

    try {
      const response = await Api.post<AiResponse>('ai/suggestions', {
        prompt
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch suggestions");
      }
    
      const data = response.data;
      setAiResponse(data.message || "No suggestions available");
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setAiResponse("There was an error fetching suggestions. Please try again.");
      setModalVisible(true);
    }
  };

  const handleMouseLeaveButton = () => {
    const timer = setTimeout(() => setTooltipVisible(false), 1000);
    setTooltipTimer(timer);
  };

  const handleMouseEnterTooltip = () => {
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
      setTooltipTimer(null);
    }
  };

  return (
    <div className="fixed bottom-14 right-14 z-50">
      <div className="relative">
        <div
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={handleMouseLeaveButton} 
          className={`${getButtonColor()} text-white rounded-full p-3 shadow-lg focus:outline-none transition duration-300 hover:shadow-xl`}
        >
          <FaRobot className="text-2xl" />
        </div>

        {tooltipVisible && (
          <div 
            onMouseEnter={handleMouseEnterTooltip} 
            onMouseLeave={() => setTooltipVisible(false)} 
            className="absolute bottom-14 right-0 bg-white text-black rounded-lg p-3 shadow-lg transition-opacity duration-200 w-64"
          >
            <p className="font-semibold text-lg">{savingsMessage}</p>
            <button
              onClick={handleAskAi}
              className="mt-2 w-full bg-gray-600 text-white rounded-md p-2 transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              AI Suggestions
            </button>
          </div>
        )}
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
            <p>{aiResponse}</p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
