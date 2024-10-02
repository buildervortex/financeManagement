import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import GoalViewModel from '../viewModels/GoalsViewModel';
import GoalDto from '../dtos/goal/goalDto';
import AddGoalDto from '../dtos/goal/addGoalDto';
import { handleErrorResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import GoalList from '../components/GoalList';

interface GoalAddProps { }

interface InputElement {
  labelContent: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  id: string;
  className: string;
  placeholder: string;
}

const GoalAdd: FunctionComponent<GoalAddProps> = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [currencyType, setCurrencyType] = useState<string>('LKR');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [remindBeforeDays, setRemindBeforeDays] = useState<number>(1);
  const [goals, setGoals] = useState<GoalDto[]>([]);

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

    const newGoal: AddGoalDto = {
      name,
      description,
      targetAmount,
      startDate: new Date(),
      deadline: deadline || undefined,
      currencyType,
      remindBeforeDays
    };

    const result = await new GoalViewModel().addGoal(newGoal);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      setName('');
      setDescription('');
      setTargetAmount(0);
      setCurrencyType('LKR');
      setDeadline(null);
      setRemindBeforeDays(1);
    }
  };

  // Input elements configuration
  const inputElements: InputElement[] = [
    {
      labelContent: 'Goal Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      type: 'text',
      name: 'name',
      id: 'name',
      className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      placeholder: 'Enter Goal Name'
    },
    {
      labelContent: 'Description',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
      type: 'text',
      name: 'description',
      id: 'description',
      className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      placeholder: 'Enter Description'
    },
    {
      labelContent: 'Target Amount',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTargetAmount(parseFloat(e.target.value)),
      type: 'number',
      name: 'targetAmount',
      id: 'targetAmount',
      className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      placeholder: 'Enter Target Amount'
    },
    {
      labelContent: 'Currency Type',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCurrencyType(e.target.value),
      type: 'text',
      name: 'currencyType',
      id: 'currencyType',
      className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      placeholder: 'Enter Currency Type'
    },
    {
      labelContent: 'Deadline',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDeadline(new Date(e.target.value)),
      type: 'date',
      name: 'deadline',
      id: 'deadline',
      className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      placeholder: ''
    },
    {
      labelContent: 'Remind Before Days',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRemindBeforeDays(parseInt(e.target.value)),
      type: 'number',
      name: 'remindBeforeDays',
      id: 'remindBeforeDays',
      className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      placeholder: 'Enter Reminder Days'
    }
  ];

  return (
    <>
      <InputForm
        formName='Add Goal Information'
        submitButton='Submit'
        inputs={inputElements}
        onSubmit={handleSubmit}
      />
      <div className="my-4">
        <GoalList 
        description='No expense added yet.'
        GoalList={goals} /> 
      </div>
    </>
  );
};

export default GoalAdd;
