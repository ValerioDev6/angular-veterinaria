import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IRolCombo } from '../interfaces/rol-combo.interface';
import { IStaffResponse, User } from '../interfaces/staff.interface';
import { IStaff } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class StaffService {
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

  private staffResource = httpResource<IStaffResponse>(() => ({
    url: `${this.API_BASE}/staff`,
    params: this.params(),
    method: 'GET',
  }));

  staff = computed(() => this.staffResource.value()?.users ?? ([] as User[]));
  error = computed(() => this.staffResource.error() as HttpErrorResponse);
  loading = computed(() => this.staffResource.isLoading());
  total = computed(() => this.staffResource.value()?.info.total ?? 0);

  refresh(): void {
    this.staffResource.reload();
  }

  private roleResource = rxResource({
    loader: () => {
      return this.http.get<IRolCombo[]>(`${this.API_BASE}/staff/combo`);
    },
  });
  rolCombo = computed(() => this.roleResource.value() ?? ([] as IRolCombo[]));

  getStaffById(id: string): Observable<IStaff> {
    this.loading$$.next(true);
    return this.http.get<IStaff>(`${this.API_BASE}/staff/${id}`).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  deleteStaffById(id: string): Observable<void> {
    this.loading$$.next(true);
    return this.http.delete<void>(`${this.API_BASE}/staff/${id}`).pipe(
      tap(() => this.refresh$$.next()),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loading$$.next(false)),
    );
  }


  updatedStaff(id: string, data: any): Observable<IStaff> {
    this.loading$$.next(true);
    return this.http.patch<IStaff>(`${this.API_BASE}/staff/${id}`, data).pipe(
      tap(() => this.refresh$$.next()),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }
  addStaff(data: any): Observable<IStaff> {
    this.loading$$.next(true);
    return this.http.post<IStaff>(`${this.API_BASE}/staff`, data).pipe(
      tap(() => this.refresh$$.next()),
      // catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
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
