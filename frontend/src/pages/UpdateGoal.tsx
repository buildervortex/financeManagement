import { FunctionComponent, useState, useEffect } from 'react';
import GoalViewModel from '../viewModels/GoalsViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import UpdateGoalDto from '../dtos/goal/updateGoalDto';
import GoalDto from '../dtos/goal/goalDto';
import { useLocation } from 'react-router-dom';

interface UpdateGoalPageProps {}

interface LocationState {
    goal: GoalDto;
}

const UpdateGoal: FunctionComponent<UpdateGoalPageProps> = () => {
    const location = useLocation();
    const { goal } = location.state as LocationState;
    const [name, setName] = useState<string | undefined>(goal.name);
    const [description, setDescription] = useState<string | undefined>(goal.description);
    const [remindBeforeDays, setRemindBeforeDays] = useState<number | undefined>(goal.remindBeforeDays);

    useEffect(() => {
        setName(goal.name);
        setDescription(goal.description);
        setRemindBeforeDays(goal.remindBeforeDays);
    }, [goal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const goalId = goal.id ?? '';
        const updateGoalDto: UpdateGoalDto = new UpdateGoalDto();
        updateGoalDto.name = name;
        updateGoalDto.description = description;
        updateGoalDto.remindBeforeDays = remindBeforeDays;

        const result = await new GoalViewModel().updateGoal(updateGoalDto, goalId);
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        } else {
            handleSuccessResult('Goal Updated Successfully');
        }

        setName('');
        setDescription('');
        setRemindBeforeDays(1);
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
            <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
                        Update Goal Information
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Enter Description"
                            />
                        </div>
                       
                        <div>
                            <label
                                htmlFor="remindBeforeDays"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Remind Before Days
                            </label>
                            <input
                                type="number"
                                id="remindBeforeDays"
                                name="remindBeforeDays"
                                value={remindBeforeDays}
                                onChange={(e) => setRemindBeforeDays(parseInt(e.target.value, 10))}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Enter Remind Before Days"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateGoal;
