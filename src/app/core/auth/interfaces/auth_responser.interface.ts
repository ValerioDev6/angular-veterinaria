export interface IAuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  avatar: null;
  email: string;
  role: string;
  permissions: string[];
}



// enums/role.enum.ts
export enum RoleType {
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

// enums/permisos.enum.ts
export enum IPERMISOS {
  CALENDAR = "calendar",
  LIST_VACCIONATION = "list_vaccionation",
  REGISTER_VETERINARY = "register_veterinary",
  DELETE_APPOINTMENT = "delete_appointment",
  EDIT_PAYMENT = "edit_payment",
  REGISTER_APPOINTMENT = "register_appointment",
  DELETE_PET = "delete_pet",
  LIST_SURGERIES = "list_surgeries",
  SHOW_PAYMENT = "show_payment",
  DELETE_ROL = "delete_rol",
  EDIT_PET = "edit_pet",
  LIST_APPOINTMENT = "list_appointment",
  SHOW_MEDICAL_RECORDS = "show_medical_records",
  REGISTER_SURGERIES = "register_surgeries",
  EDIT_SURGERIES = "edit_surgeries",
  SHOW_REPORT_GRAFICS = "show_report_grafics",
  LIST_PET = "list_pet",
  EDIT_VACCIONATION = "edit_vaccionation",
  LIST_VETERINARY = "list_veterinary",
  DELETE_VETERINARY = "delete_veterinary",
  PROFILE_PET = "profile_pet",
  DELETE_VACCIONATION = "delete_vaccionation",
  EDIT_APPOINTMENT = "edit_appointment",
  LIST_STAFF = "list_staff",
  PROFILE_VETERINARY = "profile_veterinary",
  REGISTER_PET = "register_pet",
  EDIT_VETERINARY = "edit_veterinary",
  LIST_ROL = "list_rol",
  REGISTER_STAFF = "register_staff",
  REGISTER_ROL = "register_rol",
  EDIT_STAFF = "edit_staff",
  DELETE_SURGERIES = "delete_surgeries",
  DELETE_STAFF = "delete_staff",
  EDIT_ROL = "edit_rol",
  REGISTER_VACCIONATION = "register_vaccionation"
}

