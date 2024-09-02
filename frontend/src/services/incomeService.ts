import AddIncome from "../types/AddIncome";
import Income from "../types/Income";
import ErrorMessage from "../viewModels/error";
import Api from "./api";
import Cast from "../utils/cast";

export default class IncomeService {
    static async addIncome(addincome: AddIncome): Promise<Income | ErrorMessage> {
        const response = await Api.post<Income | ErrorMessage>("/incomes",addincome );
        return Cast.errorMessageCast(response);
    }


    
}
