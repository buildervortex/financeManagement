type UpdateIncome = {
    name: string ;
    description: string ;
    amount: number ;
    currencyType: string ;
    monthly: boolean ;
    monthlyDate?: number;
}

export default UpdateIncome;