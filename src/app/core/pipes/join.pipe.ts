import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
  transform(array: any[], separator: string = ', ', key?: string): string {
    if (!array) return '';
    const items = key ? array.map((item) => item[key]) : array;
    return items.join(separator);
  }
}
