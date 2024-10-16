import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaBullseye,
  FaHistory
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
  LineChart,
  Line,
} from "recharts";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isValid,
  subDays,
  isBefore,
  isAfter,
} from "date-fns";
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

  const [monthlyChartData, setMonthlyChartData] = useState<
    Array<{
      date: string;
      income: number;
      expense: number;
      subscription: number;
    }>
  >([]);

  const [filteredMonthlyChartData, setFilteredMonthlyChartData] = useState<
    Array<{
      date: string;
      income: number;
      expense: number;
      subscription: number;
    }>
  >([]);

  const [activeSlide, setActiveSlide] = useState(0);

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

    // New logic for monthly chart data
    const currentDate = new Date();
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const dailyData = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    }).map((day) => ({
      date: format(day, "dd"),
      income: 0,
      expense: 0,
      subscription: 0,
    }));

    incomes.forEach((income) => {
      const incomeDate = new Date(income.incomeDate);
      if (
        isValid(incomeDate) &&
        incomeDate >= monthStart &&
        incomeDate <= monthEnd
      ) {
        const day = incomeDate.getDate();
        dailyData[day - 1].income += income.amount || 0;
      }
    });

    expenses.forEach((expense) => {
      if (expense.paymentDate) {
        const expenseDate = new Date(expense.paymentDate);
        if (
          isValid(expenseDate) &&
          expenseDate >= monthStart &&
          expenseDate <= monthEnd
        ) {
          const day = expenseDate.getDate();
          dailyData[day - 1].expense += expense.amount || 0;
        }
      }
    });

    subscriptions.forEach((subscription) => {
      if (
        subscription.initialPaymentDate &&
        subscription.installmentIntervalDays
      ) {
        let subscriptionDate = new Date(subscription.initialPaymentDate);
        const firstPaymentDate = subDays(
          subscriptionDate,
          subscription.installmentIntervalDays
        );

        if (
          isValid(firstPaymentDate) &&
          firstPaymentDate >= monthStart &&
          firstPaymentDate <= monthEnd
        ) {
          const day = firstPaymentDate.getDate();
          dailyData[day - 1].subscription += subscription.amount || 0;
        }

        // Add subsequent payments if they fall within the month
        while (subscriptionDate <= monthEnd) {
          if (subscriptionDate >= monthStart) {
            const day = subscriptionDate.getDate();
            dailyData[day - 1].subscription += subscription.amount || 0;
          }
          subscriptionDate = new Date(
            subscriptionDate.setDate(
              subscriptionDate.getDate() + subscription.installmentIntervalDays
            )
          );
        }
      }
    });

    setMonthlyChartData(dailyData);
  }, [incomes, expenses, subscriptions, goals]);

  const COLORS = ["#007BFF", "#FFA500", "#0056b3", "#CC7A00"];

  const overviewData = [
    { name: "Expenses", value: totalExpenses },
    { name: "Subscriptions", value: totalSubscriptions },
    { name: "Goal Expenses", value: totalGoalExpenses },
  ];

  const expenseCategories = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + (expense.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  const subCategories = subscriptions.reduce((acc, subscription) => {
    const category = subscription.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + (subscription.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  const subCategoryData = Object.entries(subCategories).map(
    ([name, value]) => ({ name, value })
  );

  const expenseCategoryData = Object.entries(expenseCategories).map(
    ([name, value]) => ({ name, value })
  );

  const goalProgress = goals.map((goal) => ({
    name: goal.name || "Unnamed Goal",
    currentAmount: goal.currentAmount || 0,
    remainingAmount: (goal.targetAmount || 0) - (goal.currentAmount || 0),
  }));

  const saving =
    totalIncome > 0 ? totalIncome - totalExpenses - totalSubscriptions -totalGoalExpenses : 0;

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const expensePercentage =
    totalIncome > 0
      ? ((totalExpenses + totalSubscriptions + totalGoalExpenses) /
          totalIncome) *
        100
      : 0;

  const expenseVsIncomeData = [
    { name: "Safe", value: 60, color: "#4CAF50" },
    { name: "Warning", value: 20, color: "#FFA726" },
    { name: "Danger", value: 20, color: "#F44336" },
  ];

  const COLORS1 = {
    blue: ["#007BFF", "#0056b3", "#003380", "#001f4d"],
  };

  const cx = 175;
  const cy = 175;
  const iR = 60;
  const oR = 120;

  const needle = (value: number) => {
    const length = (iR + 2 * oR) / 3;
    const angle = 180 - value * 1.8;
    const sin = Math.sin((-angle * Math.PI) / 180);
    const cos = Math.cos((-angle * Math.PI) / 180);
    const x0 = cx;
    const y0 = cy;
    const xEnd = x0 + length * cos;
    const yEnd = y0 + length * sin;

    return (
      <>
        <circle cx={x0} cy={y0} r={5} fill="#333" />
        <line
          x1={x0}
          y1={y0}
          x2={xEnd}
          y2={yEnd}
          stroke="#333"
          strokeWidth={2}
        />
      </>
    );
  };

  // Data for Income vs Savings pie chart
  const incomeVsSavingsData = [
    {
      name: "Expenses",
      value: totalExpenses + totalSubscriptions + totalGoalExpenses,
      color: "#FF8042",
    },
    { name: "Savings", value: saving, color: "#00C49F" },
  ];

  const today = new Date();
  const pastChartData = monthlyChartData.filter((data) => {
    const dataDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      parseInt(data.date)
    );
    return isBefore(dataDate, today) || dataDate.getDate() === today.getDate();
  });

  const futureChartData = monthlyChartData.filter((data) => {
    const dataDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      parseInt(data.date)
    );
    return isAfter(dataDate, today);
  });

  // Handle chart data changes based on carousel item
  const handleCarouselChange = (index: number) => {
    setActiveSlide(index);
    if (index === 0) {
      setFilteredMonthlyChartData(pastChartData);
    } else if (index === 1) {
      setFilteredMonthlyChartData(futureChartData);
    }
  };

  return (
    <div className="px-12 py-6 min-h-screen bg-light-blue">
      {/* Navigation Buttons */}
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
        <button
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300 transform hover:scale-105 active:scale-95"
          onClick={() => handleNavigation("/History")}
        >
          <FaHistory className="text-lg mr-2" />
          <span>History</span>
        </button>
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
          <p className="text-2xl font-bold">${totalGoalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-light-blue shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-dark-blue">
            Total Saving
          </h3>
          <p className="text-2xl font-bold">${saving.toFixed(2)}</p>
        </div>
      </div>

      {/* Line Chart takes full 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-2 gap-6">

      <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {activeSlide === 0 
            ? `Financial Overview - ${format(new Date(), "MMMM yyyy")}`
            : "Financial Overview - Upcoming"}
        </h2>
        <div className="relative">
        <style>
            {`
              .carousel .control-dots .dot {
                background: black !important;
                box-shadow: none !important;
                opacity: 0.5;
              }
              .carousel .control-dots .dot.selected {
                opacity: 1;
              }
            `}
          </style>
          <Carousel
            showThumbs={false}
            onChange={handleCarouselChange}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={false}
           
          >
            {/* First Slide: Past Data (1 to Today) */}
            <div className="pb-10">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={pastChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#007BFF"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#FFA500"
                    name="Expense"
                  />
                  <Line
                    type="monotone"
                    dataKey="subscription"
                    stroke="#0056b3"
                    name="Subscription"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Second Slide: Future Data (Tomorrow to End of Month) */}
            <div className="pb-10">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={futureChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#007BFF"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#FFA500"
                    name="Expense"
                  />
                  <Line
                    type="monotone"
                    dataKey="subscription"
                    stroke="#0056b3"
                    name="Subscription"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Carousel>
        </div>
      </div></div>

      {/* Single-column layout for pie and bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pie Chart with Needle */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Expense vs. Income Ratio
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseVsIncomeData}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR}
                startAngle={180}
                endAngle={0}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseVsIncomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              {needle(expensePercentage)}
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <p>Expense Ratio: {expensePercentage.toFixed(2)}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Income vs Savings
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeVsSavingsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {incomeVsSavingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index+1]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Expenses Overview
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Subscription Categories
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {subCategoryData.map((entry, index) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
