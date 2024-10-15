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
        fetchAndSetData(
          () => new ExpenseViewModel().getExpenses(),
          setExpenses
        ),
        fetchAndSetData(
          () => new SubscriptionViewModel().getSubscriptions(),
          setSubscriptions
        ),
      ]);
    };

    const url = location.pathname;
    const containsKeywords = /goal|expenses|subscription/i.test(url);

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


      setSavingsMessage(`You have $${savings.toFixed(2)} left to spend.`);
    };

    calculateTotalsAndSavings();
  }, [incomes, expenses, subscriptions, goals]);


  const getButtonColor = () => {
    const savings = parseFloat(savingsMessage.replace(/[^0-9.-]+/g, "")); 

    if (savings > 1000) {
      return "bg-green-500"; 
    } else if (savings > 0) {
      return "bg-yellow-500"; 
    } else {
      return "bg-orange-500"; 
    }
  };

  return (
    <div className="fixed bottom-16 right-16">
      <div className="relative">
        <button
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          className={`${getButtonColor()} text-white rounded-full p-4 shadow-lg focus:outline-none transition duration-300`}
        >
          <FaRobot />
        </button>

        {tooltipVisible && (
          <div className="absolute bottom-14 left-0 bg-white text-black rounded-lg p-4 shadow-lg transition-opacity duration-200">
            <div className="relative">
              <p className="font-semibold">{savingsMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
