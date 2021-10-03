import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTruncate'
})
export class TextTruncatePipe implements PipeTransform {

  transform(text: string, endIndex: number): string {
    return text.slice(0, endIndex);
  }

}
