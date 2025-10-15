import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IHistorialMedico } from '../interfaces/historial_medico.interface';

@Injectable({
  providedIn: 'root',
})
export class HistorialMedicoService {
  private readonly BASE_API = environment.API_URL;
  private readonly _http = inject(HttpClient);

  getMedicalHistoryByPetName(petName: string, serviceType?: string): Observable<IHistorialMedico> {
    let params = new HttpParams();

    if (petName) {
      params = params.set('pet_name', petName);
    }

    if (serviceType && serviceType !== 'TODOS') {
      params = params.set('service_type', serviceType);
    }

    return this._http.get<IHistorialMedico>(`${this.BASE_API}/medical-history`, { params });
  }
}
