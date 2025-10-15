import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Cirujia, ICirujiasResponse } from '../interfaces/cirujias.interface';

@Injectable({
  providedIn: 'root'
})
export class CirujiaService {
  private readonly BASE_API = environment.API_URL;
  private readonly _http = inject(HttpClient)


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

  private cirujiasResource = httpResource<ICirujiasResponse>(() => ({
    url: `${this.BASE_API}/cirujias`,
    params: this.params(),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }))

  cirujias = computed(() => this.cirujiasResource.value()?.cirujias ?? ([] as Cirujia[]))
  cirujiasTotal = computed(() => this.cirujiasResource.value()?.total ?? 0);
  isLoading = computed(() => this.cirujiasResource.isLoading());


  addVacuna(data: any) {
    return this._http.post(`${this.BASE_API}/vacunas`, data)
  }

   refresh(): void {
    this.cirujiasResource.reload();
  }

  addCirujia(data: any) {
    return this._http.post(`${this.BASE_API}/cirujias`, data)

  }


}
