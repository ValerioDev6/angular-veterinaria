export interface ICitasResponse {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
  next:       null;
  prev:       null;
  citas:      Cita[];
}

export interface Cita {
  id:              number;
  day:             string;
  day_appointment: Date;
  reason:          string;
  reprograming:    boolean;
  state_payment:   string;
  pet:             Pet;
  veterinarian:    Veterinarian;
  pagos:           Pago[];
  created_at:      Date;
  updated_at:      Date;
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
