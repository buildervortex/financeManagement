import IncomeDto from "../dtos/income/incomeDto";
import IncomeMapper from "../mappers/incomeMapper";
import IncomeService from "../services/incomeService";
import ErrorMessage from "./error";

export default class IncomeViewModel {
    async getIncomes (): Promise<IncomeDto[] | ErrorMessage>{
        const response = await IncomeService.getIncomes();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response.map(income => IncomeMapper.ToIncomeDtoFromIncome(income));

    }
           
    }