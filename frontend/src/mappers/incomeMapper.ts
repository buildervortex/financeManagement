import addIncomeDto from "../dtos/income/addIncomeDto";
import AddIncome from "../types/AddIncome";
import UpdateIncome from "../types/UpdateIncome";
import updateIncomeDto from "../dtos/income/updateIncomeDto";
import deleteIncomeDto from "../dtos/income/deleteIncomeDto";
import Income from "../types/Income";
import IncomeDto from "../dtos/income/incomeDto";

export default class IncomeMapper{
    static ToAddIncomeFromAddIncomeDto(addincomedto: addIncomeDto ): AddIncome{
        const addincome: AddIncome = {
            name: addincomedto.name,
            description: addincomedto.description,
            amount: addincomedto.amount,
            currencyType: addincomedto.currencyType,
            monthly: addincomedto.monthly,
            monthlyDate:  addincomedto.monthlyDate

        }
        return addincome;
    }

    static ToUpdateIncomeFromUpdateIncomeDto(updateincomedto: updateIncomeDto ): UpdateIncome{
        const updateincome: UpdateIncome = {
            name: updateincomedto.name,
            description: updateincomedto.description,
            amount: updateincomedto.amount,
            currencyType: updateincomedto.currencyType,
            monthly: updateincomedto.monthly,
            monthlyDate:  updateincomedto.monthlyDate

        }
        return updateincome;
    }

    static ToIncomeDtoFromIncome(income: Income) : IncomeDto{
        const incomeDto: IncomeDto = new IncomeDto();
            incomeDto.amount= income.amount;
            incomeDto.currencyType= income.currencyType;
            incomeDto.description= income.description;
            incomeDto.id=income.id;
            incomeDto.monthly=income.monthly;
            incomeDto.monthlyDate=income.monthlyDate;
            incomeDto.name=income.name;
            return incomeDto;
        }
        
}