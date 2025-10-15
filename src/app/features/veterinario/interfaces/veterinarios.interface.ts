export interface IVeterinarioResponse {
  page: number;
  limit: number;
  total: number;
  next: string;
  prev: null;
  veterinarios: Veterinario[];
}

export interface Veterinario {
  id: string;
  username: string;
  email: string;
  email_verified_at: boolean;
  password: string;
  phone: string;
  type_documento: string;
  n_documento: string;
  birthday: Date;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  roles: Roles;
  schedules: Schedule[];
}

export interface Roles {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Schedule {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  hour_group: string;
  created_at: Date;
  updated_at: Date;
}
