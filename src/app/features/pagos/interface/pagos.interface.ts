export interface IPagosResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  next: null;
  prev: null;
  pagos: Pago[];
}

export interface Pago {
  id: number;
  tipo: string;
  servicio_id: number;
  monto: number;
  adelanto: number;
  metodo_pago: string;
  estado: string;
  fecha: Date;
  pet: Pet;
  veterinarian: Veterinarian;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
}

export interface Veterinarian {
  id: string;
  username: string;
  email: string;
}
