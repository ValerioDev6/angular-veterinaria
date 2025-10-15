export interface IHistorialMedico {
  medical_records: MedicalRecord[];
  total: number;
}

export interface MedicalRecord {
  id: number;
  event_type: null | string;
  event_date: string;
  notes: null | string;
  pet: Pet;
  owner: Owner;
  created_by: CreatedBy;
  service_veterinarian: Veterinarian;
  record_veterinarian: Veterinarian;
  service: Service | null;
  created_at: Date;
}

export interface CreatedBy {
  id?: string;
  username?: string;
  email?: string;
  phone?: null;
  type_documento?: null;
  n_documento?: null;
}

export interface Owner {
  id: number;
  username: string;
  email: string;
  phone: string;
  type_documento: string;
  n_documento: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: Date;
  gender: string;
  color: string;
  weight: number;
  photo: string;
  medical_notes: string;
}

export interface Veterinarian {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export interface Service {
  id: number;
  date: Date;
  reason?: string;
  state_payment: string;
  reprograming?: boolean;
  monto: string;
  adelanto: string;
  metodo_pago: string;
  surgerie_type?: string;
  medical_notes?: string;
  outcome?: string;
  state?: string;
  outside?: number;
}
