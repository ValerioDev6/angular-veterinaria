import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, finalize, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ISheduleHours, SheduleHoursGroup } from '../interfaces/shedule_hours.interface';
import { IVeterinario } from '../interfaces/veterinario.interface';
import { IVeterinarioResponse, Veterinario } from '../interfaces/veterinarios.interface';

@Injectable({
  providedIn: 'root',
})
export class VeterinarioService {
  private readonly API_BASE = environment.API_URL;
  private loading$$ = new BehaviorSubject<boolean>(false);
  private error$$ = new Subject<string>();
  private refresh$$ = new Subject<void>();

  private readonly http = inject(HttpClient);

  page = signal<number>(1);
  limit = signal<number>(5);
  search = signal<string>('');
  private params = computed(() => ({
    page: this.page(),
    limit: this.limit(),
    search: this.search(),
  }));
  private veterinarioResource = httpResource<IVeterinarioResponse>(() => ({
    url: `${this.API_BASE}/veterinario`,
    params: this.params(),
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }));

  veterinarios = computed(() => this.veterinarioResource.value()?.veterinarios ?? ([] as Veterinario[]));
  loading = computed(() => this.veterinarioResource.isLoading());
  error = computed(() => this.veterinarioResource.error() as HttpErrorResponse);
  total = computed(() => this.veterinarioResource.value()?.total ?? 0);
  refresh(): void {
    this.veterinarioResource.reload();
  }
  private configSheduleHoursResource = rxResource({
    loader: () => {
      return this.http.get<ISheduleHours>(`${this.API_BASE}/veterinario/config`);
    },
  });

  sheduleHours = computed(
    () => this.configSheduleHoursResource.value()?.shedule_hours_groups ?? ([] as SheduleHoursGroup[]),
  );

  updatedVeterinarian(id: string, data: any): Observable<IVeterinario> {
    this.loading$$.next(true);
    return this.http.patch<IVeterinario>(`${this.API_BASE}/veterinario/${id}`, data).pipe(
      tap(() => this.refresh$$.next()),
      finalize(() => this.loading$$.next(false)),
    );
  }


  createVeterinario(data: any) {
    this.loading$$.next(true);
    return this.http.post(`${this.API_BASE}/veterinario`, data).pipe(
      tap(() => this.refresh$$.next()),
      finalize(() => this.loading$$.next(false)),
    );
  }

  getVeterinarioById(id:string): Observable<IVeterinario> {
    this.loading$$.next(true)
    return this.http.get<IVeterinario>(`${this.API_BASE}/veterinario/${id}`)
    .pipe(
      finalize(() => this.loading$$.next(false))
    )
  }
}
