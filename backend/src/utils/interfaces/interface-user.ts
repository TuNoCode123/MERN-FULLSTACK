import User from "../../models/model-user";

export interface userType {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  passWord?: string | number;
  address?: string;
  phoneNumber?: string;
  gender?: boolean;
  roleId?: string;
  spectialId?: string;
  image?: any;
  position?: string;
}
export interface ErrorType extends Error {
  status: number;
}
export interface Ires {
  email?: string;
  firstName?: string;
  lastName?: string;
}
export interface Idata<T> {
  errCode?: number;
  message?: string;
  data?: T;
}
