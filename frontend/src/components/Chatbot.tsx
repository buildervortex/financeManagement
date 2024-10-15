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
      return "bg-red-600"; // Danger color
    } else if (expensePercentage > 30) {
      return "bg-yellow-400"; // Warning color
    } else {
      return "bg-green-500"; // Safe color
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
    Object.entries(expenseCategoryData).map(([category, amount]) => `${category}: $${amount}`).join('\n') + `\n\n` +
    `Subscription Categories:\n` +
    Object.entries(subscriptionCategoryData).map(([category, amount]) => `${category}: $${amount}`).join('\n') + `\n\n` +
    `Please provide suggestions on how to improve my financial situation.`;

    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setAiResponse(data.message || "No suggestions available");
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setAiResponse("There was an error fetching suggestions. Please try again.");
      setModalVisible(true);
    }
  };

  const handleMouseLeaveButton = () => {
    // Set a timer to hide the tooltip after 1 second
    const timer = setTimeout(() => setTooltipVisible(false), 1000);
    setTooltipTimer(timer);
  };

  const handleMouseEnterTooltip = () => {
    // If the mouse enters the tooltip, clear the timer
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
      setTooltipTimer(null);
    }
  };

  return (
    <div className="fixed bottom-14 right-14">
      <div className="relative">
        <div
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={handleMouseLeaveButton} // Change this line to use the new handler
          className={`${getButtonColor()} text-white rounded-full p-4 shadow-lg focus:outline-none transition duration-300`}
        >
          <FaRobot />
        </div>

        {tooltipVisible && (
          <div 
            onMouseEnter={handleMouseEnterTooltip} // Add this handler for the tooltip
            onMouseLeave={() => setTooltipVisible(false)} // Hide tooltip when not hovering
            className="absolute bottom-14 left-0 bg-white text-black rounded-lg p-4 shadow-lg transition-opacity duration-200"
          >
            <div className="relative">
              <p className="font-semibold">{savingsMessage}</p>
              <button
                onClick={handleAskAi}
                className="mt-2 bg-blue-500 text-white rounded px-2 py-1 transition hover:bg-blue-700"
              >
                Ask AI
              </button>
            </div>
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
              className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700"
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
