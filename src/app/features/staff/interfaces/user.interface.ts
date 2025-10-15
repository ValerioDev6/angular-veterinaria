export interface IStaff {
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
}

export interface Roles {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
