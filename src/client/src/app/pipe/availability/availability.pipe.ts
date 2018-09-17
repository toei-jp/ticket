
/**
 * AvailabilityPipe
 */
import { Pipe, PipeTransform } from '@angular/core';

export interface IAvailability {
    symbolText: string;
    icon: string;
    className: string;
}

@Pipe({
    name: 'availability'
})
export class AvailabilityPipe implements PipeTransform {

    /**
     * 変換
     * @method transform
     * @param {number} value
     */
    public transform(value: number): IAvailability {
        const availability = [
            {
                symbolText: '×',
                icon: 'icon-vacancy-full-white',
                className: 'vacancy-full'
            },
            {
                symbolText: '△',
                icon: 'icon-vacancy-little-white',
                className: 'vacancy-little'
            },
            {
                symbolText: '○',
                icon: 'icon-vacancy-large-white',
                className: 'vacancy-large'
            }
        ];

        return (value === 0)
            ? availability[0] : (value <= 10)
                ? availability[1] : availability[2];
    }

}
