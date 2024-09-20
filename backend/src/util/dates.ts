export function getDifferenceInDays(date1: Date, date2: Date): number {
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
}