import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, finalize, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ICreateRol, IUpdatedRol } from '../interfaces/create-rol.interface';
import { IRol } from '../interfaces/rol.inteface';
import { IRolesResponse, Role } from '../interfaces/roles.interface';
import { setErrorMessage } from './error-message';
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private readonly _http = inject(HttpClient);
  private readonly API_BASE = environment.API_URL;
  private loading$$ = new BehaviorSubject<boolean>(false);
  private error$$ = new Subject<string>();
  private refresh$$ = new Subject<void>();

  page = signal<number>(1);
  limit = signal<number>(5);
  search = signal<string>('');
  private parms = computed(() => ({
    page: this.page(),
    limit: this.limit(),
    search: this.search(),
  }));

  private rolesResource = httpResource<IRolesResponse>(() => ({
    url: `${this.API_BASE}/roles`,
    params: this.parms(),
    method: 'GET',
  }));

  roles = computed(() => this.rolesResource.value()?.roles ?? ([] as Role[]));
  error = computed(() => this.rolesResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Roles'));
  isLoading = computed(() => this.rolesResource.isLoading());
  total = computed(() => this.rolesResource.value()?.total ?? 0);
  refresh(): void {
    this.rolesResource.reload();
  }
  getRoleById(id: string): Observable<IRol> {
    this.loading$$.next(true);
    return this._http.get<IRol>(`${this.API_BASE}/roles/${id}`).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }
  deleteRolById(id: string): Observable<void> {
    this.loading$$.next(true);
    return this._http.delete<void>(`${this.API_BASE}/roles/${id}`).pipe(
      tap(() => this.refresh$$.next()),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }
  addRole(role: ICreateRol): Observable<IRol> {
    this.loading$$.next(true);
    return this._http.post<IRol>(`${this.API_BASE}/roles`, role).pipe(
      tap(() => this.refresh$$.next()),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  updatedRole(id: string, role: IUpdatedRol): Observable<IRol> {
    this.loading$$.next(true);
    return this._http.patch<IRol>(`${this.API_BASE}/roles/${id}`, role).pipe(
      tap(() => this.refresh$$.next()),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this._http.delete<boolean>(`${this.API_BASE}/roles/${id}`).pipe(
      catchError(() => of(false)),
      map(() => true),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
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
