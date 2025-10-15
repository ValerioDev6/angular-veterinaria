

export interface IVeterinario {
  id:             string;
  username:       string;
  email:          string;
  phone:          string;
  type_documento: string;
  n_documento:    string;
  birthday:       Date;
  avatar:         string;
  role:           Roles;
  schedule:       Schedule[];
}

export interface Roles {
  id: string;
  name: string;
}

export interface Schedule {
  day:   string;
  hours: Hour[];
}

export interface Hour {
  id:         string;
  hour_start: string;
  hour_end:   string;
  hour_group: string;
}
