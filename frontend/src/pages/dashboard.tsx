import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaMoneyBillWave,
    FaFileInvoiceDollar,
    FaBullseye,
} from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,

} from "recharts";
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

const Dashboard = () => {
    const [incomes, setIncomes] = useState<IncomeDto[]>([]);
    const [goals, setGoals] = useState<GoalDto[]>([]);
    const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
    const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);


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
                fetchAndSetData(
                    new SubscriptionViewModel().getSubscriptions,
                    setSubscriptions
                ),
                
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
                    const monthsDiff =
                        (today.getFullYear() - incomeDate.getFullYear()) * 12 +
                        (today.getMonth() - incomeDate.getMonth());
                    return total + income.amount * (monthsDiff + 1);
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
              };
              
        const calculateTotalGoalExpenses = () => {
            return goals.reduce(
                (total, goal) => total + (goal.currentAmount || 0),
                0
            );
        };

        setTotalIncome(calculateTotalIncome());
        setTotalExpenses(calculateTotalExpenses());
        setTotalSubscriptions(calculateTotalSubscriptions());
        setTotalGoalExpenses(calculateTotalGoalExpenses());
    }, [incomes, expenses, subscriptions, goals]);

    const COLORS = ["#007BFF", "#FFA500", "#0056b3", "#CC7A00"];

    const overviewData = [
        { name: "Income", value: totalIncome },
        { name: "Expenses", value: totalExpenses },
        { name: "Subscriptions", value: totalSubscriptions },
        { name: "Goal Expenses", value: totalGoalExpenses },
    ];

    const expenseCategories = expenses.reduce((acc, expense) => {
        const category = expense.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + (expense.amount || 0);
        return acc;
    }, {} as Record<string, number>);

    const expenseCategoryData = Object.entries(expenseCategories).map(
        ([name, value]) => ({ name, value })
    );

    const goalProgress = goals.map((goal) => ({
        name: goal.name || "Unnamed Goal",
        currentAmount: goal.currentAmount || 0,
        remainingAmount: (goal.targetAmount || 0) - (goal.currentAmount || 0),
    }));

    const saving =
        totalIncome > 0 ? totalIncome - totalExpenses - totalSubscriptions : 0;

    const handleNavigation = (url: string) => {
        navigate(url);
    };

    return (
        <div className="px-12 py-6 min-h-screen bg-light-blue">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg mb-8 p-4 space-y-4 md:space-y-0 md:space-x-4">
                <button
                    className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none transition duration-300 transform hover:scale-105 active:scale-95"
                    onClick={() => handleNavigation("/addincome")}
                >
                    <FaMoneyBillWave className="text-lg mr-2" />
                    <span>Incomes +</span>
                </button>
                <button
                    className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none transition duration-300 transform hover:scale-105 active:scale-95"
                    onClick={() => handleNavigation("/addExpense")}
                >
                    <FaFileInvoiceDollar className="text-lg mr-2" />
                    <span>Expenses +</span>
                </button>
                <button
                    className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none transition duration-300 transform hover:scale-105 active:scale-95"
                    onClick={() => handleNavigation("/addGoal")}
                >
                    <FaBullseye className="text-lg mr-2" />
                    <span>Goals +</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-light-blue shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2 text-dark-blue">
                        Total Income
                    </h3>
                    <p className="text-2xl font-bold ">${totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-light-orange shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2 text-dark-orange">
                        Total Expenses
                    </h3>
                    <p className="text-2xl font-bold ">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="bg-light-orange shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2 text-dark-orange">
                        Total Subscriptions
                    </h3>
                    <p className="text-2xl font-bold ">
                        ${totalSubscriptions.toFixed(2)}
                    </p>
                </div>
                <div className="bg-light-blue shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2 text-dark-blue">
                        Total Saving
                    </h3>
                    <p className="text-2xl font-bold ">${saving.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Financial Overview Pie Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Financial Overview
                    </h2>
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
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Expense Categories Donut Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Expense Categories
                    </h2>
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
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Goal Progress Stacked Bar Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Goal Progress
                    </h2>
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
