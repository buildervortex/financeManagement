class SubscriptionDto {
    id?: string
    name?: string
    category?: string
    description?: string
    amount?: number
    currencyType?: string
    nextInstallmentDate?: Date;
    previousInstalmentDate?: Date;
    installmentStartingDate?: Date
    duration?: number
    repeatCount?: number
    repeatAlways?: boolean
    remindBeforeDays?: number
    paidInstallments?: number;
}

export default SubscriptionDto;