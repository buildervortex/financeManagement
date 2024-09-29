import { FunctionComponent } from 'react';
import GoalDto from '../dtos/goal/goalDto';
import { useNavigate } from 'react-router-dom';

interface GoalListProps {
  formName?: string;
  description?: string;
  GoalList: GoalDto[];
}

const GoalList: FunctionComponent<GoalListProps> = ({ formName, description, GoalList }) => {

  const navigate = useNavigate();

  const handleItemClick = (goal: GoalDto) => {
    navigate('/Goal-details', { state: { goal } });
  };

  return (
    <div className="mt-8 w-full max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black border-b pb-2">{formName}</h2>
      {GoalList.length > 0 ? (
        <>
          <ul className="space-y-4">
            {GoalList.map((goal, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(goal)}
                className="bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{goal.name}</p>
                    <p className="text-xs text-gray-500">{goal.description}</p>
                  </div>
                  <p className="text-lg font-bold text-orange-500">
                    {goal.currencyType} {goal.targetAmount?.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-500 text-center py-6">{description}</p>
      )}
    </div>
  );
};

export default GoalList;
