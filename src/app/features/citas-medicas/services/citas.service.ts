import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, finalize, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ICitaResponse } from '../interfaces/cita.interface';
import { Cita, ICitasResponse } from '../interfaces/citas_pagiantion.dto';
import { IComboPacientes } from '../interfaces/pacientes_combo.dto';
import { IVeterinarianShedule } from '../interfaces/veterinarios_horarios.interface';

@Injectable({
  providedIn: 'root',
})
export class CitasMedicasService {
  private readonly http = inject(HttpClient);
  private readonly API_BASE = environment.API_URL;

  private loading$$ = new BehaviorSubject<boolean>(false);
  private refresh$$ = new Subject<void>();

  page = signal<number>(1);
  limit = signal<number>(10);
  petName = signal<string>('');
  species = signal<string>('');

  veterinarianName = signal<string>('');
  state_payment = signal<string>('');
  dateFrom = signal<string>('');
  dateTo = signal<string>('');


 getVeterinarianByShedule(date_appointment: string, hour?: string): Observable<IVeterinarianShedule> {
    this.loading$$.next(true);

    let params = new HttpParams().set('date_appointment', date_appointment);

    if (hour) {
      params = params.set('hour', hour);
    }

    return this.http.get<IVeterinarianShedule>(`${this.API_BASE}/citas/veterinarian-shedules`, { params }).pipe(
      tap(() => this.refresh$$.next()),
      finalize(() => this.loading$$.next(false)),
    );
  }
  private params = computed(() => ({
    page: this.page(),
    limit: this.limit(),
    petName: this.petName(),
    species: this.species(),
    veterinarianName: this.veterinarianName(),
    state_payment: this.state_payment(),
    dateFrom: this.dateFrom(),
    dateTo: this.dateTo(),
  }));

  private citasResource = httpResource<ICitasResponse>(() => ({
    url: `${this.API_BASE}/citas`,
    params: this.params(),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }));

  citas = computed(() => this.citasResource.value()?.citas ?? ([] as Cita[]));
  citasTotal = computed(() => this.citasResource.value()?.total ?? 0);
  isLoading = computed(() => this.citasResource.isLoading());

  pacientesResource = rxResource({
    loader: () => {
      return this.http.get<IComboPacientes[]>(`${this.API_BASE}/citas/pacientes`);
    },
  });

  pacientes = computed(() => this.pacientesResource.value() ?? ([] as IComboPacientes[]));

  getCitaById(id:number) :Observable<ICitaResponse>{
    return this.http.get<ICitaResponse>(`${this.API_BASE}/citas/${id}`)
  }

  addCita(data: any): Observable<any> {
    this.loading$$.next(true);
    return this.http.post<any>(`${this.API_BASE}/citas`, data).pipe(
      tap(() => this.refresh$$.next()),
      finalize(() => this.loading$$.next(false)),
    );
  }

  update(data: any, id: number) {
    this.loading$$.next(true)
    return this.http.patch(`${this.API_BASE}/citas/${id}`, data).pipe(
      tap(() =>this.refresh$$.next()),
      finalize(() =>this.loading$$.next(false))
    )
  }

  deleteCitaMedica(id:number) {
    this.loading$$.next(true)
    return this.http.delete(`${this.API_BASE}/citas/${id}`).pipe(
      tap(() => this.refresh$$.next()),
      finalize(() => this.loading$$.next(false))
    )
  }

  refresh(): void {
    this.citasResource.reload();
  }

}
