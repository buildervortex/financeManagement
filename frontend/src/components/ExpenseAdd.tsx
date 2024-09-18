import { FunctionComponent, useState,useEffect } from 'react';
import InputForm from '../components/inputForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseViewModel from '../viewModels/ExpenseViewModel';
import { handleErrorResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import addExpenseDto from '../dtos/expense/addExpenseDto';
import ExpenseDto from '../dtos/expense/expenseDto';

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

const ExpenseAdd: FunctionComponent<AddExpenseProps> = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [currencyType, setCurrencyType] = useState<string>("");
  const [paid, setPaid] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);

  useEffect(() => {
     const fetchExpenses = async () => {
      const result: ExpenseDto[] | ErrorMessage = await new ExpenseViewModel().getExpenses();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setExpenses(result); 
      }    };
    fetchExpenses();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

    const AddExpenseDto: addExpenseDto = new addExpenseDto();
    AddExpenseDto.name = name;
    AddExpenseDto.category = category;
    AddExpenseDto.description = description;
    AddExpenseDto.amount = amount;
    AddExpenseDto.currencyType = currencyType;
    AddExpenseDto.paid = paid;
    const result = await new ExpenseViewModel().addExpense(AddExpenseDto)
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
  } 

    setName("");
    setCategory("");
    setDescription("");
    setAmount(0);
    setCurrencyType("");
    setPaid(false);
  };

  // Input elements configuration
  const inputElements: InputElement[] = [
    {
      labelContent: 'Expense Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      type: "text",
      name: "name",
      id: "name",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Expense Name"
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
        labelContent: 'Paid',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPaid(e.target.checked),
        type: "checkbox",
        name: "Paid",
        id: "Paid",
        className: "mx-3 mr-2 leading-tight",
        placeholder: ""
      },
  ];

  return (
    <>
      <InputForm
        formName='Add Expense Information'
        submitButton='Submit'
        inputs={inputElements}
        onSubmit={handleSubmit}
      />

<div className="my-4">
        <ExpenseList 
        description='No expense added yet.'
        ExpenseList={expenses} /> 
      </div>
    </>
  );
};

export default ExpenseAdd;
