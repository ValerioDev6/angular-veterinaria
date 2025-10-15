import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Asumimos que el valor viene en formato "HH:MM:SS"
    const timeParts = value.split(':');
    if (timeParts.length < 2) return value;

    let hours = Number.parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convertir a formato 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // Si es 0, debe ser 12 AM

    return `${hours}:${minutes} ${ampm}`;
  }
}
