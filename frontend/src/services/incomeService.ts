import ErrorMessage from "../viewModels/error";
import Api from "./api";
import Cast from "../utils/cast";
import IncomeDto from "../dtos/income/incomeDto";
import addIncomeDto from "../dtos/income/addIncomeDto";
import updateIncomeDto from "../dtos/income/updateIncomeDto";
import IncomeRangeDto from "../dtos/income/incomeRangeDto";
import GetAllIncomeQueryParams from "../query/income/getAllIncomeQueryParams";

export default class IncomeService {
    static async addIncome(addincomeDto: addIncomeDto): Promise<IncomeDto | ErrorMessage> {
        const response = await Api.post<IncomeDto | ErrorMessage>("/incomes", addincomeDto);
        return Cast.errorMessageCast(response);
    }

    static async updateIncome(updateincomeDto: updateIncomeDto, id: string): Promise<IncomeDto | ErrorMessage> {
        const response = await Api.put<IncomeDto | ErrorMessage>(`/incomes/${id}`, updateincomeDto);
        return Cast.errorMessageCast(response);
    }

    static async deleteIncome(id: string): Promise<IncomeDto | ErrorMessage> {
        const response = await Api.delete<IncomeDto | ErrorMessage>(`/incomes/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async getIncomes(getAllIncomeQueryParams: GetAllIncomeQueryParams): Promise<IncomeDto[] | ErrorMessage> {
        const response = await Api.get<IncomeDto[] | ErrorMessage>(`/incomes/`, {
            params: getAllIncomeQueryParams
        });
        return Cast.errorMessageCast(response);
    }

    static async getIncome(id: string): Promise<IncomeDto | ErrorMessage> {
        const response = await Api.get<IncomeDto | ErrorMessage>(`/incomes/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async getIncomeInRange(incomeRangeDto: IncomeRangeDto): Promise<IncomeDto[] | ErrorMessage> {
        const response = await Api.post<IncomeDto[] | ErrorMessage>(`/incomes/range`, incomeRangeDto);
        return Cast.errorMessageCast(response);
    }

}
