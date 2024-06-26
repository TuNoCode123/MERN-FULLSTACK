export interface Ilogin {
  errCode: number;
  message: string;
  data: {
    email: string;
    lastName: number;
    firstName: number;
  };
}
export interface IallCodeData {
  valueVi?: string;
  valueEn?: string;
  key?: string;
}
export interface IallCode<T> {
  errCode?: number;
  message?: string;
  data: T[];
}
export interface IallCode1<T> {
  errCode?: number;
  message?: string;
  data?: T[];
}
export interface Iuser<T> {
  id?: number;
  email?: string;
  passWord: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  roleId?: T;
  spectialId?: T;
  image?: any;
  positionId?: T;
  position: T;
  role: T;
}
