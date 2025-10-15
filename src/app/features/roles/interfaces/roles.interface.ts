export interface IRolesResponse {
  page: number;
  limit: number;
  total: number;
  next: string;
  prev: null;
  roles: Role[];
}

export interface Permissions {
  id: string;
  action: string;
  created_at: Date;
  updated_at: Date;
  object: Role;
}

export interface RolePermission {
  id: string;
  created_at: Date;
  updated_at: Date;
  permissions: Permissions;
}

export interface Role {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  role_permissions?: RolePermission[];
}
