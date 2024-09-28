import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import { handleErrorResult,handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import UpdateSubscriptionDto, { validateUpdateSubscriptionDto } from '../dtos/subscription/updateSubscriptionDto';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';
import { useLocation } from 'react-router-dom';

interface UpdateSubscriptionPageProps {}

interface LocationState {
    subscription: SubscriptionDto;
}

interface InputElement {
    labelContent: string;
    value?: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    id: string;
    className: string;
    placeholder?: string;
}

const SubscriptionUpdatePage: FunctionComponent<UpdateSubscriptionPageProps> = () => {
    const location = useLocation();
    const { subscription } = location.state as LocationState;

    // Initialize state for all fields including category and remindBeforeDays
    const [name, setName] = useState<string>(subscription.name || "");
    const [description, setDescription] = useState<string>(subscription.description || "");
    const [amount, setAmount] = useState<number>(subscription.amount || 0);
    const [currencyType, setCurrencyType] = useState<string>(subscription.currencyType || "LKR");
    const [category, setCategory] = useState<string>(subscription.category || "subscription");
    const [remindBeforeDays, setRemindBeforeDays] = useState<number>(subscription.remindBeforeDays || 1);

    useEffect(() => {
        // Set default values for subscription data
        setName(subscription.name || "");
        setDescription(subscription.description || "");
        setAmount(subscription.amount || 0);
        setCurrencyType(subscription.currencyType || "LKR");
        setCategory(subscription.category || "subscription");
        setRemindBeforeDays(subscription.remindBeforeDays || 1);
    }, [subscription]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create DTO instance and set all field values
        const updateSubscriptionDto = new UpdateSubscriptionDto();
        updateSubscriptionDto.name = name;
        updateSubscriptionDto.description = description;
        updateSubscriptionDto.amount = amount;
        updateSubscriptionDto.currencyType = currencyType;
        updateSubscriptionDto.category = category;
        updateSubscriptionDto.remindBeforeDays = remindBeforeDays;

        // Validate DTO
        const validationResult = validateUpdateSubscriptionDto(updateSubscriptionDto);
        if (validationResult.error) {
            console.error(validationResult.error.details[0].message);
            return; // Handle validation error appropriately
        }

        // Attempt to update subscription
        const result = await new SubscriptionViewModel().updateSubscription(updateSubscriptionDto, subscription.id || "");
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        } else {
            // Clear the form after successful submission
            handleSuccessResult('Subscription Updated Successfully')
            setName("");
            setDescription("");
            setAmount(0);
            setCurrencyType("LKR");
            setCategory("subscription");
            setRemindBeforeDays(1);
        }
    };

    const inputElements: InputElement[] = [
        {
            labelContent: 'Subscription Name',
            value: name,
            onChange: (e) => setName(e.target.value),
            type: "text",
            name: "name",
            id: "name",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Name"
        },
        {
            labelContent: 'Description',
            value: description,
            onChange: (e) => setDescription(e.target.value),
            type: "text",
            name: "description",
            id: "description",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Description"
        },
        {
            labelContent: 'Amount',
            value: amount,
            onChange: (e) => setAmount(parseFloat(e.target.value)),
            type: "number",
            name: "amount",
            id: "amount",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Amount"
        },
        {
            labelContent: 'Currency Type',
            value: currencyType,
            onChange: (e) => setCurrencyType(e.target.value),
            type: "text",
            name: "currencyType",
            id: "currencyType",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Currency Type"
        },
        {
            labelContent: 'Category',
            value: category,
            onChange: (e) => setCategory(e.target.value),
            type: "text",
            name: "category",
            id: "category",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Category"
        },
        {
            labelContent: 'Remind Before Days',
            value: remindBeforeDays,
            onChange: (e) => setRemindBeforeDays(parseInt(e.target.value, 10)),
            type: "number",
            name: "remindBeforeDays",
            id: "remindBeforeDays",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Remind Before Days"
        }
    ];

    return (
        <InputForm
            formName='Update Subscription Information'
            submitButton='Submit'
            inputs={inputElements}
            onSubmit={handleSubmit}
        />
    );
};

export default SubscriptionUpdatePage;

