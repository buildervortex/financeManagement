class SubscriptionDto {
    id?: string
    name?: string
    category?: string
    description?: string
    amount?: number
    nextInstallmentDate?: Date;
    lastPaymentDate?: Date;
    initialPaymentDate?: Date
    installmentIntervalDays?: number
    totalInstallments?: number
    isRecurringIndefinitely?: boolean
    remindBeforeDays?: number
    completedInstallments?: number;
}

export default SubscriptionDto;