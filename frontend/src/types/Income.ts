type Income ={
    [x: string]: any;
    id: string;
    name: string ;
    description: string ;
    amount: number  ;
    currencyType: string ;
    monthly: boolean ;
    monthlyDate?: number;
}

export default Income;