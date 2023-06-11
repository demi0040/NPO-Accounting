import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageDifference'
})
export class PercentageDifferencePipe implements PipeTransform {

  transform(totalActualIncome: number, promisedAmount: number): number {
    if (promisedAmount === 0) {
      return 0;
    }

    const difference = promisedAmount - totalActualIncome;
    const percentage = (difference / promisedAmount) * 100;

    return Math.round(percentage * 100) / 100; // Round to 2 decimal places
  }

}
