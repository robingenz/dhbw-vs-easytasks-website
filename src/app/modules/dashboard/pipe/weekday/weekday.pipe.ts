import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weekday',
})
export class WeekdayPipe implements PipeTransform {
    transform(value: number, args?: any): string {
        switch (value) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 7:
                return 'Sunday';
            default:
                return '';
        }
    }
}
