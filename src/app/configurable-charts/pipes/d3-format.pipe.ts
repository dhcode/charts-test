import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'd3-format';

@Pipe({
  name: 'd3Format',
  pure: true
})
export class D3FormatPipe implements PipeTransform {

  transform(value: number, args?: string): any {
    return format(args)(value);
  }

}
