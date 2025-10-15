import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IPaciente } from '../interfaces/paciente.interface';
import { IPacienteResponse, Paciente } from '../interfaces/pacientes.interface';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private readonly API_BASE = environment.API_URL;
  private readonly http = inject(HttpClient);

  private loading$$ = new BehaviorSubject<boolean>(false);
  private error$$ = new Subject<string>();
  private refresh$$ = new Subject<void>();

  page = signal<number>(1);
  limit = signal<number>(10);
  search = signal<string>('');

  private params = computed(() => ({
    page: this.page(),
    limit: this.limit(),
    search: this.search(),
  }));

  private readonly pacienteResource = httpResource<IPacienteResponse>(() => ({
    url: `${this.API_BASE}/pacientes`,
    params: this.params(),
    method: 'GET',
  }));

  pacientes = computed(() => this.pacienteResource.value()?.pacientes ?? ([] as Paciente[]));
  loading = computed(() => this.pacienteResource.isLoading());
  total = computed(() => this.pacienteResource.value()?.total ?? 0);
  refresh() {
    this.pacienteResource.reload();
  }

  addPaciente(data: any): Observable<any> {
    this.loading$$.next(true);
    return this.http.post(`${this.API_BASE}/pacientes`, data).pipe(
      tap(() => this.refresh$$.next()),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  updatePaciente( id: number,data: any,) {
    this.loading$$.next(true);
    return this.http.patch(`${this.API_BASE}/pacientes/${id}`, data).pipe(
      tap(() => this.refresh$$.next()),
      finalize(() => this.loading$$.next(false)),
    );
  }

  getPacienteById(id: number): Observable<IPaciente> {
    this.loading$$.next(true);
    return this.http
      .get<IPaciente>(`${this.API_BASE}/pacientes/${id}`)
      .pipe(finalize(() => this.loading$$.next(false))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Error de operación';
    if (error.status === 404) {
      message = 'Recurso no encontrado';
    } else if (error.status === 500) {
      message = 'Error interno del servidor';
    } else if (error.error?.message) {
      message = error.error.message;
    }
    this.error$$.next(message);
    return throwError(() => new Error(message));
  }
}
