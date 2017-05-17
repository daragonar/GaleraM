import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTags'
})
export class RemoveTags implements PipeTransform {

  /*
  Takes a value and removes html tags.
 */
  transform(value: any) {
    value = value + ''; // make sure it's a string
    return value ? String(value).replace(/<[img+h1+a][^>]+>/gm, '') : '';
  }

}