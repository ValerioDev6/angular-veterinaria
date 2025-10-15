

export interface IPacienteResponse {
  page:      number;
  limit:     number;
  total:     number;
  next:      string;
  prev:      null;
  pacientes: Paciente[];
}

export interface Paciente {
  id:              number;
  name:            string;
  species:         string;
  breed:           string;
  birth_date:      Date;
  gender:          string;
  color:           string;
  weight:          number;
  photo:           string;
  photo_public_id: string;
  medical_notes:   string;
  owner_id:        number;
  created_at:      Date;
  updated_at:      Date;
  owner:           Owner;
}

export interface Owner {
  id:             number;
  first_name:     string;
  last_name:      string;
  email:          string;
  phone:          string;
  address:        string;
  city:           string;
  type_documento: string;
  n_documento:    string;
  created_at:     Date;
  updated_at:     Date;
}
