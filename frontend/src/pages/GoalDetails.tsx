import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ErrorMessage from '../viewModels/error';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import GoalsViewModel from '../viewModels/GoalsViewModel';
import GoalDto from '../dtos/goal/goalDto';

interface LocationState {
  goal: GoalDto;
}

const GoalDetails: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { goal } = location.state as LocationState || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date | undefined) => {
    return date ? new Intl.DateTimeFormat('en-US').format(new Date(date)) : '-';
  };

  const handlePaymentClick = () => {
    navigate('/addGoalPayment', { state: { goal } });
  };

  const handleUpdateClick = () => {
    navigate('/updateGoal', { state: { goal } });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteGoal = async () => {
    const goalId = goal.id ?? '';
    const result: GoalDto | ErrorMessage = await new GoalsViewModel().DeleteGoal(goalId);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Goal Deleted Successfully');
      navigate('/addGoal');
    }
    closeModal();
  };

  const calculatePercentage = () => {
    if (!goal.currentAmount || !goal.targetAmount || goal.targetAmount === 0) return 0;
    return Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  };

  const percentage = calculatePercentage();
  const chartData = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const COLORS = ['#0088FE', '#E0E0E0'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded">
          <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-2xl p-8 m-10 mx-auto mt-10 rounded-lg shadow-xl bg-gray-50">
      <h1 className="px-4 mb-3 text-2xl text-center text-gray-900">GOAL DETAILS</h1>
      
      <div className="mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          </div>

      <div className="p-4">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Goal Name:</p>
          <p className="text-xl text-gray-600">{goal.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Description:</p>
          <p className="text-lg text-gray-600">{goal.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Target Amount:</p>
          <p className="text-xl text-gray-600">{goal.currencyType} {(goal.targetAmount ?? 0).toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Current Amount:</p>
          <p className="text-xl text-gray-600">{goal.currencyType} {(goal.currentAmount ?? 0).toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Start Date:</p>
          <p className="text-xl text-gray-600">{formatDate(goal.startDate)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Deadline:</p>
          <p className="text-xl text-gray-600">{formatDate(goal.deadline)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Achieved:</p>
          <p className={`text-xl ${goal.isAchieved ? 'text-green-600' : 'text-red-600'}`}>
            {goal.isAchieved ? "Yes" : "No"}
          </p>
        </div>
        <div className="items-center mt-6">
          <div className='flex items-center gap-x-4'>
            <button 
              onClick={handlePaymentClick} 
              className="my-2 px-4 py-2 border border-[#FF8343] bg-[#FF8343] text-white rounded-md hover:bg-[#fd8b53]">
              Add Goal Payment
            </button>
            <button 
              onClick={handleUpdateClick} 
              className="px-5 py-2 border border-[#FF8343] text-[#FF8343] rounded-md hover:bg-gray-300"
            >
              Update Goal
            </button>
            <button 
              onClick={handleDeleteClick} 
              className="px-5 py-2 border border-[#FF8343] text-[#FF8343] rounded-md hover:bg-gray-300">
              Delete Goal
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50" onClick={closeModal}>
          <div 
            className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <p className="mb-4 text-gray-600">Are you sure you want to delete this goal entry?</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={closeModal} 
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={deleteGoal} 
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalDetails;