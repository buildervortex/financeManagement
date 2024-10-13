import React, { FunctionComponent, useState, useEffect } from 'react';
import GoalViewModel from '../viewModels/GoalsViewModel';
import GoalDto from '../dtos/goal/goalDto';
import AddGoalDto from '../dtos/goal/addGoalDto';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import GoalList from '../components/GoalList';

interface AddGoalProps { }

const AddGoal: FunctionComponent<AddGoalProps> = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [remindBeforeDays, setRemindBeforeDays] = useState<number>(1);
  const [goals, setGoals] = useState<GoalDto[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const result: GoalDto[] | ErrorMessage = await new GoalViewModel().getGoals();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setGoals(result);
      }
    };
    fetchGoals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addGoalDto: AddGoalDto = new AddGoalDto();
    addGoalDto.name = name;
    addGoalDto.description = description;
    addGoalDto.targetAmount = targetAmount;
    addGoalDto.startDate = new Date();
    addGoalDto.deadline = deadline || undefined;
    addGoalDto.remindBeforeDays = remindBeforeDays;
    const result = await new GoalViewModel().addGoal(addGoalDto);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Goal Added Successfully')
    }
    setName('');
    setDescription('');
    setTargetAmount(0);
    setDeadline(null);
    setRemindBeforeDays(1);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mt-6 mb-4">
        <GoalList 
          description='No goals added yet.'
          GoalList={goals}
        />
      </div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#FF8343] text-white rounded-lg hover:bg-[#E66D2C] transition-colors"
      >
        <span className="w-5 h-5 inline-flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            {showForm ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            )}
          </svg>
        </span>
        {showForm ? '' : 'Add Goal'}
      </button>
  
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Goal Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Goal Name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Description"
              required
            />
          </div>
          <div>
            <label htmlFor="targetAmount" className="block mb-2 text-sm font-medium text-gray-900">Target Amount</label>
            <input
              type="number"
              name="targetAmount"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Target Amount"
              required
            />
          </div>
         
          <div>
            <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={deadline ? deadline.toISOString().split('T')[0] : ''}
              onChange={(e) => setDeadline(new Date(e.target.value))}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="remindBeforeDays" className="block mb-2 text-sm font-medium text-gray-900">Remind Before Days</label>
            <input
              type="number"
              name="remindBeforeDays"
              id="remindBeforeDays"
              value={remindBeforeDays}
              onChange={(e) => setRemindBeforeDays(parseInt(e.target.value))}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              placeholder="Enter Reminder Days"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddGoal;