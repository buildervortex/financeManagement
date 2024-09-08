type Income ={
    id: string;
    name: string ;
    description: string ;
    amount: number  ;
    currencyType: string ;
    monthly: boolean ;
    monthlyDate?: number;
    incomeDate: Date;
}

export default Income;
// In my project of express and nodejs i have used mappers to map the data between model and the 