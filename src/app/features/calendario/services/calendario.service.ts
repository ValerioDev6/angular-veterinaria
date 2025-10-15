import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ICalendarResponse } from '../interfaces/calendar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {

  private readonly API_BASE : string= environment.API_URL;
  private readonly http = inject(HttpClient);

  getCalendar():Observable<ICalendarResponse> {
    return this.http.get<ICalendarResponse>(`${this.API_BASE}/calendar`)
  }

  updateCita(id: number, data:any) :Observable<ICalendarResponse>{
    return this.http.patch<ICalendarResponse>(`${this.API_BASE}/calendar/${id}`, data)
  }

}
