import { FunctionComponent, useState, useEffect } from 'react';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import UpdateSubscriptionDto, { validateUpdateSubscriptionDto } from '../dtos/subscription/updateSubscriptionDto';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';
import { useLocation } from 'react-router-dom';

interface UpdateSubscriptionPageProps {}

interface LocationState {
    subscription: SubscriptionDto;
}

const SubscriptionUpdatePage: FunctionComponent<UpdateSubscriptionPageProps> = () => {
    const location = useLocation();
    const { subscription } = location.state as LocationState;

    const [name, setName] = useState<string>(subscription.name || "");
    const [description, setDescription] = useState<string>(subscription.description || "");
    const [amount, setAmount] = useState<number>(subscription.amount || 0);
    const [category, setCategory] = useState<string>(subscription.category || "subscription");
    const [remindBeforeDays, setRemindBeforeDays] = useState<number>(subscription.remindBeforeDays || 1);

    useEffect(() => {
        setName(subscription.name || "");
        setDescription(subscription.description || "");
        setAmount(subscription.amount || 0);
        setCategory(subscription.category || "subscription");
        setRemindBeforeDays(subscription.remindBeforeDays || 1);
    }, [subscription]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateSubscriptionDto = new UpdateSubscriptionDto();
        updateSubscriptionDto.name = name;
        updateSubscriptionDto.description = description;
        updateSubscriptionDto.amount = amount;
        updateSubscriptionDto.category = category;
        updateSubscriptionDto.remindBeforeDays = remindBeforeDays;

        const validationResult = validateUpdateSubscriptionDto(updateSubscriptionDto);
        if (validationResult.error) {
            console.error(validationResult.error.details[0].message);
            return;
        }

        const result = await new SubscriptionViewModel().updateSubscription(updateSubscriptionDto, subscription.id || "");
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        } else {
            handleSuccessResult('Subscription Updated Successfully');
            setName("");
            setDescription("");
            setAmount(0);
            setCategory("subscription");
            setRemindBeforeDays(1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
            <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
                        Update Subscription Information
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Subscription Name
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
                                htmlFor="amount"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Enter Amount"
                            />
                        </div>
                       
                        <div>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Enter Category"
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

export default SubscriptionUpdatePage;
