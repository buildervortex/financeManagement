import addIncomeDto from "../dtos/income/addIncomeDto";
import AddIncome from "../types/AddIncome";

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




}