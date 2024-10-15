import AddExpenseDto from "../dto/expense/addExpenseDto";
import ExpenseDto from "../dto/expense/expenseDto";
import UpdateExpenseDto from "../dto/expense/updateExpenseDto";
import Expense from "../model/expense";

export default class ExpenseMapper {
    static ToExpenseDto(expense: Expense): ExpenseDto {
        const expenseDto = new ExpenseDto();

        expenseDto.amount = expense.amount;
        expenseDto.category = expense.category;
        expenseDto.description = expense.description;
        expenseDto.id = expense._id.toString();
        expenseDto.name = expense.name;
        expenseDto.paymentDate = expense.paymentDate;
        expenseDto.paid = expense.paid;
        expenseDto.type = expense.type;

        return expenseDto;
    }

    static ToExpenseFromAddExpenseDto(addExpenseDto: AddExpenseDto): Expense {
        const expense = new Expense();

        expense.amount = addExpenseDto.amount!;
        expense.category = addExpenseDto.category?.toLocaleLowerCase()!;
        expense.description = addExpenseDto.description!;
        expense.name = addExpenseDto.name!;
        expense.paid = addExpenseDto.paid!;
        expense.paymentDate = new Date()
        expense.type = "direct"

        return expense;
    }

    static ToExpenseFromUpdateExpenseDto(updateExpenseDto: UpdateExpenseDto): Expense {
        const expense = new Expense();

        expense.amount = updateExpenseDto.amount!;
        expense.category = updateExpenseDto.category?.toLowerCase()!;
        expense.description = updateExpenseDto.description!;
        expense.name = updateExpenseDto.name!;
        expense.paid = updateExpenseDto.paid!;

        return expense;
    }
}