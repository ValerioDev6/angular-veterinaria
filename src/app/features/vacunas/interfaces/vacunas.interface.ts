export interface IVacunasResponse {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
  next:       null;
  prev:       null;
  vacunas:    Vacuna[];
}

export interface Vacuna {
  id:              number;
  vaccination_day: Date;
  reason:          string;
  state_payment:   string;
  pet:             Pet;
  veterinarian:    Veterinarian;
  pagos:           Pago[];
}

export interface Pago {
  id:          number;
  monto:       string;
  adelanto:    string;
  metodo_pago: string;
  estado:      string;
}

export interface Pet {
  id:      number;
  name:    string;
  species: string;
  breed:   string;
}

export interface Veterinarian {
  id:       string;
  username: string;
  email:    string;
}
