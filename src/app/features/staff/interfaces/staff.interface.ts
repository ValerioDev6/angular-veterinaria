// export interface IStaffResponse {
//   page: number;
//   limit: number;
//   total: number;
//   next: string;
//   prev: null;
//   users: User[];
// }

// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   email_verified_at: boolean;
//   password: string;
//   phone: string;
//   type_documento: string;
//   n_documento: string;
//   birthday: Date;
//   avatar: string;
//   created_at: Date;
//   updated_at: Date;
//   roles: Roles;
// }

// export interface Roles {
//   id: string;
//   name: string;
//   created_at: Date;
//   updated_at: Date;
// }



export interface IStaffResponse {
  info:  Info;
  users: User[];
}

export interface Info {
  page:  number;
  limit: number;
  total: number;
  next:  string;
  prev:  null;
}

export interface User {
  id:                string;
  username:          string;
  email:             string;
  email_verified_at: boolean;
  password:          string;
  phone:             string;
  type_documento:    string;
  n_documento:       string;
  birthday:          Date;
  avatar:            null | string;
  avatar_public_id:  null | string;
  created_at:        Date;
  updated_at:        Date;
  roles:             Roles;
}

export interface Roles {
  id:          string;
  name:        string;
  description: null | string;
  created_at:  Date;
  updated_at:  Date;
}

