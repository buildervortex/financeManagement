import AddIncome from "../types/AddIncome";
import Income from "../types/Income";
import UpdateIncome from "../types/UpdateIncome";

import ErrorMessage from "../viewModels/error";
import Api from "./api";
import Cast from "../utils/cast";

export default class IncomeService {
    static async addIncome(addincome: AddIncome): Promise<Income | ErrorMessage> {
        const response = await Api.post<Income | ErrorMessage>("/incomes",addincome );
        return Cast.errorMessageCast(response);
    }

    static async updateIncome(updateincome: UpdateIncome, id: string): Promise<Income | ErrorMessage> {
        const response = await Api.put<Income | ErrorMessage>(`/incomes/${id}`,updateincome );
        return Cast.errorMessageCast(response);    
    }

    static async deleteIncome( id: string): Promise<Income | ErrorMessage> {
        const response = await Api.delete<Income | ErrorMessage>(`/incomes/${id}` );
        return Cast.errorMessageCast(response);
    }

    static async getIncomes(): Promise<Income[] | ErrorMessage> {
        const response = await Api.get<Income[] | ErrorMessage>(`/incomes/}` );
        return Cast.errorMessageCast(response);
    }

    static async getIncome( id: string): Promise<Income | ErrorMessage> {
        const response = await Api.get<Income | ErrorMessage>(`/incomes/${id}`);
        return Cast.errorMessageCast(response);
    }

}
