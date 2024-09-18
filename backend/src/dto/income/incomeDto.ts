class IncomeDto {
    id?: string
    name?: string
    description?: string
    amount?: number = 0
    currencyType?: string
    monthly?: boolean
    monthlyDate?: number;
    incomeDate?: Date
}

export default IncomeDto;