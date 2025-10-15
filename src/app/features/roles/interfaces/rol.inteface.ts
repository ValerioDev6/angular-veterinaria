export interface IRol {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  role_permissions?: RolePermission[];
}

export interface Permissions {
  id: string;
  action: string;
  created_at: Date;
  updated_at: Date;
  object: IRol;
}

export interface RolePermission {
  id: string;
  created_at: Date;
  updated_at: Date;
  permissions: Permissions;
}
