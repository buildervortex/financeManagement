import { FunctionComponent, useState} from 'react';
import InputForm from './inputForm';
import { handleErrorResult,handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
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
  }else{
    handleSuccessResult('Subscription Added Successfully')
  } 

  setName("");
  setCategory("");
  setDescription("");
  setAmount(0);
  setCurrencyType("");
  setInitialPaymentDate(undefined);
  setInstallmentIntervalDays(1);
  setTotalInstallments(undefined);
  setIsRecurringIndefinitely(false);
  setRemindBeforeDays(1);
   

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
      name: "category",
      id: "category",
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
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInitialPaymentDate(new Date(e.target.value)),
      type: "date",
      name: "initialPaymentDate",
      id: "initialPaymentDate",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Initial Payment Date"
    },
    {
      labelContent: 'Installment Interval Days',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInstallmentIntervalDays(parseInt(e.target.value)),
      type: "number",
      name: "installmentIntervalDays",
      id: "installmentIntervalDays",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Installment Interval Days"
    },
    {
      labelContent: 'Total Installments',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTotalInstallments(parseInt(e.target.value)),
      type: "number",
      name: "totalInstallments",
      id: "totalInstallments",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Total Installments"
    },
    {
      labelContent: 'Recurring Indefinitely',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setIsRecurringIndefinitely(e.target.checked),
      type: "checkbox",
      name: "isRecurringIndefinitely",
      id: "isRecurringIndefinitely",
      className: "mx-3 mr-2 leading-tight",
      placeholder: ""
    },
    {
      labelContent: 'Remind Before Days',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRemindBeforeDays(parseInt(e.target.value)),
      type: "number",
      name: "remindBeforeDays",
      id: "remindBeforeDays",
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
    </>
  );
};

export default SubscriptionAdd;