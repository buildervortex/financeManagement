import { FunctionComponent, useState,useEffect } from 'react';
import InputForm from '../components/inputForm';
import { handleErrorResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import SubscriptionDto  from '../dtos/subscription/subscriptionDto';
import SubscriptionList from './SubscriptionList';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import AddSubscriptionDto from '../dtos/subscription/addSubscriptionDto';


interface AddExpenseProps { }

interface InputElement {
  labelContent: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  id: string;
  className: string;
  placeholder: string;
}

const SubscriptionAdd: FunctionComponent<AddExpenseProps> = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [currencyType, setCurrencyType] = useState<string>("");
  const [initialPaymentDate, setInitialPaymentDate] = useState<Date>();
  const [installmentIntervalDays, setInstallmentIntervalDays] = useState<number>(1);
  const [totalInstallments, setTotalInstallments] = useState<number>();
  const [isRecurringIndefinitely, setIsRecurringIndefinitely] = useState<boolean>(false);
  const [remindBeforeDays, setRemindBeforeDays] = useState<number>(1);
  const [subscription, setSubscription] = useState<SubscriptionDto[]>([]);

  useEffect(() => {
    const fetchSubscription= async () => {
      const result: SubscriptionDto[] | ErrorMessage = await new SubscriptionViewModel().getSubscriptions();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setSubscription(result); 
      }
    };
    fetchSubscription();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

    const addsubscriptionDto: AddSubscriptionDto = new AddSubscriptionDto();
    addsubscriptionDto.name = name;
    addsubscriptionDto.category = category;
    addsubscriptionDto.description = description;
    addsubscriptionDto.amount = amount;
    addsubscriptionDto.currencyType = currencyType;
    addsubscriptionDto.initialPaymentDate = initialPaymentDate;
    addsubscriptionDto.installmentIntervalDays= installmentIntervalDays;
    addsubscriptionDto.totalInstallments=totalInstallments;
    addsubscriptionDto.isRecurringIndefinitely=isRecurringIndefinitely;
    addsubscriptionDto.remindBeforeDays=remindBeforeDays;
    
    const result = await new SubscriptionViewModel().addSusbscription(addsubscriptionDto)
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
  } 

    setName("");
    setCategory("");
    setDescription("");
    setAmount(0);
    setCurrencyType("");
   

  };

  // Input elements configuration
  const inputElements: InputElement[] = [
    {
      labelContent: 'Subscription Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      type: "text",
      name: "name",
      id: "name",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Subscription Name"
    },
    {
      labelContent: 'Category',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value),
      type: "text",
      name: "description",
      id: "description",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Category"
    },
    {
        labelContent: 'Description',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
        type: "text",
        name: "description",
        id: "description",
        className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
        placeholder: "Enter Description"
      },
    {
      labelContent: 'Amount',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value)),
      type: "number",
      name: "amount",
      id: "amount",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Amount"
    },
    {
      labelContent: 'Currency Type',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCurrencyType(e.target.value),
      type: "text",
      name: "currencyType",
      id: "currencyType",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Currency Type"
    },
    {
        labelContent: 'Initial Payment Date',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInitialPaymentDate(e.target.value),
        type: "text",
        name: "name",
        id: "name",
        className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
        placeholder: "Initial Payment Date"
      },
      {
        labelContent: 'Installment Interval Days',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInstallmentIntervalDays(e.target.value),
        type: "text",
        name: "name",
        id: "name",
        className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
        placeholder: "Installment Interval Days"
      },
      {
        labelContent: 'Total Installments',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTotalInstallments(e.target.value),
        type: "text",
        name: "name",
        id: "name",
        className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
        placeholder: "Total Installments"
      },
    {
        labelContent: 'Recurring Indefinitely',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setIsRecurringIndefinitely(e.target.checked),
        type: "checkbox",
        name: "Paid",
        id: "Paid",
        className: "mx-3 mr-2 leading-tight",
        placeholder: ""
      },
      {
        labelContent: 'Remind Before Days',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRemindBeforeDays(e.target.value),
        type: "text",
        name: "name",
        id: "name",
        className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
        placeholder: "Remind Before Days"
      },
  ];

  return (
    <>
      <InputForm
        formName='Add Subscription Information'
        submitButton='Submit'
        inputs={inputElements}
        onSubmit={handleSubmit}
      />

<div className="my-4">
        <SubscriptionList 
        description='No subscription added yet.'
        SubscriptionList={subscription} /> 
      </div>
    </>
  );
};

export default SubscriptionAdd;
