import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTags'
})
export class RemoveTags implements PipeTransform {

  /*
  Takes a value and removes html tags.
 */
  transform(value: string, type: string = 'remove') {
    switch (type){
      case 'imagesrc': {
        var match = value.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
        if(match){
          return match[1];
        }else{
          return false;
        }
      }
      default: {
        value = value + ''; // make sure it's a string
        return value ? String(value).replace(/<[img+h1][^>]+>|<p>&nbsp;<\/p>/gm, '') : '';
      }
    }
  }

}