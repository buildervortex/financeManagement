import IncomeDto from "../dtos/income/incomeDto";
import IncomeMapper from "../mappers/incomeMapper";
import IncomeService from "../services/incomeService";
import AddIncome from "../types/AddIncome";
import Income from "../types/Income";
import UpdateIncome from "../types/UpdateIncome";
import ErrorMessage from "./error";

export default class IncomeViewModel {

    async addIncome(addincome: AddIncome): Promise<IncomeDto | ErrorMessage> {
        const response = await IncomeService.addIncome(addincome);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return IncomeMapper.ToIncomeDtoFromIncome(response);
    }

    async updateIncome(updateincome: UpdateIncome, id: number): Promise<IncomeDto | ErrorMessage> {
        const response = await IncomeService.updateIncome(updateincome,`/incomes/${id}`);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return IncomeMapper.ToIncomeDtoFromIncome(response);
    }
    
    async DeleteIncome (id:string): Promise<IncomeDto | ErrorMessage>{
        const response = await IncomeService.deleteIncome(`/incomes/${id}`);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return IncomeMapper.ToIncomeDtoFromIncome(response);
    }

    async getIncomes (): Promise<IncomeDto[] | ErrorMessage>{
        const response = await IncomeService.getIncomes();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response.map(income => IncomeMapper.ToIncomeDtoFromIncome(income));

    }

    async getIncome (id: number): Promise<IncomeDto | ErrorMessage> {
        const response = await IncomeService.getIncome(`/incomes/${id}`);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return IncomeMapper.ToIncomeDtoFromIncome(response);
    }
           
    }