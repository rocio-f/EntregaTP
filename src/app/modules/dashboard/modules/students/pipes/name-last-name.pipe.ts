import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models';

@Pipe({
  name: 'nameLastName',
  standalone: false
})
export class NameLastNamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    return value.name + " - " + value.lastName;
  }

}
