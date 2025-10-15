


import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IAuthResponse, IPERMISOS, RoleType, User } from '../interfaces/auth_responser.interface';
import { LocalStorageService } from './storage/local-storage.service';
type AUTH_STATUS = 'cheking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.API_URL;

  private readonly _localStorageService = inject(LocalStorageService)
  private readonly _http = inject(HttpClient);
  private _authStatus = signal<AUTH_STATUS | null>('cheking');
  public _user = signal<User | null>(null);
  public _token = signal<string | null>(localStorage.getItem('token'))

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  get user() {
    return this._user();
  }

  hasRole(role: RoleType): boolean {
    const user = this._user();
    return user?.role === role;
  }

  hasAnyRole(roles: RoleType[]): boolean {
    const user = this._user();
    return roles.some(role => user?.role === role);
  }
  hasPermission(permission: IPERMISOS): boolean {
    const user = this._user();
    return user?.permissions.includes(permission) ?? false;
  }
  hasAnyPermission(permissions: IPERMISOS[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  hasAllPermissions(permissions: IPERMISOS[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }
  authStatus = computed<AUTH_STATUS>(() => {
    if (this.authStatus() === 'cheking') return 'cheking';
    if (this._user()) {
      return 'authenticated'
    }
    return 'not-authenticated'
  })
  login(email: string, password: string): Observable<boolean> {
    return this._http.post<IAuthResponse>(`${this.BASE_URL}/auth/login`, {
      email: email,
      password: password
    }).pipe(
      tap((resp) => this.loginAuthSucess(resp)),
      map(() => true),
      catchError((_error: any) => {
        this._user.set(null);
        this._authStatus.set('not-authenticated');
        this._token.set(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        return of(false);
      }),
    );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this._http.get<IAuthResponse>(`${this.BASE_URL}/auth/check-auth-status`).pipe(
      tap((resp) => this.loginAuthSucess(resp)),
      map(() => true),
      catchError((_error: any) => {
        this._user.set(null);
        this._authStatus.set('not-authenticated');
        this._token.set(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        return of(false);
      }),
    );
  }

  logout() {
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    this._token.set(null)
    localStorage.removeItem('token');
    this._localStorageService.removeItem('user');
  }

  private loginAuthSucess({ token, user }: IAuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token)
    localStorage.setItem('token', token)
    this._localStorageService.setItem('user', user)
  }
}
