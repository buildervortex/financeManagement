class IncomeDto {
    id: string = ""
    name: string = ""
    description: string = ""
    amount: number = 0
    currencyType: string = ""
    monthly: boolean = false
    monthlyDate?: number;
    incomeDate: Date = new Date();
}

export default IncomeDto;