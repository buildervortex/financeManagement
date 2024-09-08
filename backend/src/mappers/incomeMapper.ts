import addIncomeDto from "../dto/income/addIncomeDto";
import IncomeDto from "../dto/income/incomeDto";
import updateIncomeDto from "../dto/income/updateIncomeDto";
import Income from "../model/income";

export default class IncomeMapper {
    static ToIncomeDto(income: Income): IncomeDto {
        const incomeDto = new IncomeDto();

        incomeDto.id = income.id;
        incomeDto.currencyType = income.currencyType;
        incomeDto.description = income.description;
        incomeDto.amount = income.amount;
        incomeDto.monthly = income.monthly;
        incomeDto.monthlyDate = income.monthlyDate;
        incomeDto.name = income.name;
        incomeDto.incomeDate = income.incomeDate;

        return incomeDto;
    }

    static ToIncomeFromAddIncomeDto(addIncomeDto: addIncomeDto): Income {
        const income = new Income();
        income.amount = addIncomeDto.amount;
        income.currencyType = addIncomeDto.currencyType;
        income.description = addIncomeDto.description;
        income.monthly = addIncomeDto.monthly;
        income.monthlyDate = addIncomeDto.monthlyDate;
        income.name = addIncomeDto.name;

        return income;
    }

    static ToIncomeFromUpdateIncomeDto(updateIncomeDto: updateIncomeDto): Income {
        const income = new Income();
        income.amount = updateIncomeDto.amount;
        income.currencyType = updateIncomeDto.currencyType;
        income.description = updateIncomeDto.description;
        income.monthly = updateIncomeDto.monthly;
        income.monthlyDate = updateIncomeDto.monthlyDate;
        income.name = updateIncomeDto.name;

        return income;
    }
}