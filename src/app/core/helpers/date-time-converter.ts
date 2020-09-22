export class DateTimeConverter {
    public static convertTimestampToDate(timestamp: number): Date {
        return new Date(timestamp * 1000);
    }

    public static convertDateToTimestamp(date: Date): number {
        return date.getTime() / 1000;
    }
}
