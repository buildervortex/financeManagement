import { FunctionComponent, useState, useEffect } from 'react';
import ExpenseViewModel from '../viewModels/ExpenseViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import updateExpenseDto from '../dtos/expense/updateExpenseDto';
import ExpenseDto from '../dtos/expense/expenseDto';
import { useLocation } from 'react-router-dom';

interface updateExpensePageProps {}

interface LocationState {
    expense: ExpenseDto;
}

const ExpenseUpdatePage: FunctionComponent<updateExpensePageProps> = () => {
    const location = useLocation();
    const { expense } = location.state as LocationState;

    const [name, setName] = useState<string>(expense.name || "");
    const [description, setDescription] = useState<string>(expense.description || "");
    const [amount, setAmount] = useState<number>(expense.amount || 0);
    const [paid, setPaid] = useState<boolean>(expense.paid || false);

    useEffect(() => {
        setName(expense.name || "");
        setDescription(expense.description || "");
        setAmount(expense.amount || 0);
        setPaid(expense.paid || false);
       
    }, [expense]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateexpenseDto: updateExpenseDto = new updateExpenseDto();
        updateexpenseDto.name = name;
        updateexpenseDto.description = description;
        updateexpenseDto.amount = amount;
        updateexpenseDto.paid = paid;
        

        const result = await new ExpenseViewModel().updateExpense(updateexpenseDto, expense.id || "");
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        } else {
            handleSuccessResult('Expense Updated Successfully');
        }

        // Clear the form fields
        setName("");
        setDescription("");
        setAmount(0);
        setPaid(false);
       
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
            <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
                        Update Expense Information
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                Expense Name
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
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
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
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
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
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="paid"
                                name="paid"
                                checked={paid}
                                onChange={(e) => setPaid(e.target.checked)}
                                className="mx-3 mr-2 leading-tight"
                            />
                            <label htmlFor="paid" className="text-sm font-medium text-gray-900">
                                Paid
                            </label>
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

export default ExpenseUpdatePage;
