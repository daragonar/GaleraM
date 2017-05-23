import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Reverse pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {

transform(value) {
    return value.slice().reverse();
  }
   
}