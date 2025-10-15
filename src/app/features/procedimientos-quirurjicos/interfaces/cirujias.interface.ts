export interface ICirujiasResponse {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
  next:       null;
  prev:       null;
  cirujias:   Cirujia[];
}

export interface Cirujia {
  id:            number;
  surgerie_date: Date;
  medical_notes: string;
  state_payment: string;
  pet:           Pet;
  veterinarian:  Veterinarian;
  pagos:         Pago[];
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
