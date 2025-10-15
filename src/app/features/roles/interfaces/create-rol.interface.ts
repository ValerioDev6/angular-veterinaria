export interface ICreateRol {
  name: string;
  permissions: string[];
}
export interface IUpdatedRol {
  name?: string;
  permissions?: string[];
}
