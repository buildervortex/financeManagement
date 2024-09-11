class SubscriptionDto {
    id?: string
    name?: string = ""
    category?: string = ""
    description?: string = ""
    amount?: number = 0
    currencyType?: string = ""
    nextInstallmentDate?: Date;
    previousInstalmentDate?: Date;
    installmentStartingDate?: Date = new Date();
    duration?: number = 1;
    repeatCount?: number = 1;
    repeatAlways?: boolean = false;
    remindBeforeDays?: number = 1;
    paidInstallments?: number;
}

export default SubscriptionDto;