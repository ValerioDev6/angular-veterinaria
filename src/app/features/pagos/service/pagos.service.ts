import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IPagosResponse, Pago } from '../interface/pagos.interface';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private readonly API_BASE = environment.API_URL;
  private readonly _http = inject(HttpClient);

  page = signal<number>(1);
  limit = signal<number>(10);
  petName = signal<string>('');
  species = signal<string>('');

  veterinarianName = signal<string>('');
  state_payment = signal<string>('');
  dateFrom = signal<string>('');
  dateTo = signal<string>('');

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

  private pagosResource = httpResource<IPagosResponse>(() => ({
    url: `${this.API_BASE}/pagos`,
    params: this.params(),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }));

  pagos = computed(() => this.pagosResource.value()?.pagos ?? ([] as Pago[]));
  pagosTotal = computed(() => this.pagosResource.value()?.total ?? 0);
  isLoading = computed(() => this.pagosResource.isLoading());

  refresh(): void {
    this.pagosResource.reload();
  }

  addPayment(data: any) {
    return this._http.post(`${this.API_BASE}/pagos`, data);
  }
}
