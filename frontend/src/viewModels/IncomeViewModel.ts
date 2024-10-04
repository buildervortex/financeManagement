import addIncomeDto, { validateAddIncomeDto } from "../dtos/income/addIncomeDto";
import IncomeDto from "../dtos/income/incomeDto";
import IncomeRangeDto, { validateIncomeRangeDto } from "../dtos/income/incomeRangeDto";
import updateIncomeDto, { validateUpdateIncome } from "../dtos/income/updateIncomeDto";
import IncomeService from "../services/incomeService";
import ErrorMessage from "./error";

export default class IncomeViewModel {

    async addIncome(addIncome: addIncomeDto): Promise<IncomeDto | ErrorMessage> {
        const { error } = validateAddIncomeDto(addIncome);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await IncomeService.addIncome(addIncome);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async updateIncome(updateIncomeDto: updateIncomeDto, id: string): Promise<IncomeDto | ErrorMessage> {
        const { error } = validateUpdateIncome(updateIncomeDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);


        const response = await IncomeService.updateIncome(updateIncomeDto, id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async DeleteIncome(id: string): Promise<IncomeDto | ErrorMessage> {
        const response = await IncomeService.deleteIncome(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async getIncomes(): Promise<IncomeDto[] | ErrorMessage> {
        const response = await IncomeService.getIncomes();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;

    }

    async getIncome(id: string): Promise<IncomeDto | ErrorMessage> {
        const response = await IncomeService.getIncome(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async getIncomesInRange(incomeRangeDto: IncomeRangeDto): Promise<IncomeDto[] | ErrorMessage> {
        const { error } = validateIncomeRangeDto(incomeRangeDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await IncomeService.getIncomeInRange(incomeRangeDto);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }

        return response;
    }
}