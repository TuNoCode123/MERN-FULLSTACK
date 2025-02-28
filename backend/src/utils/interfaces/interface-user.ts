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
  inforBooking?: Ires1;
  inforDoctor?: Ires2;
  calender?: { time: string };
  language?: string;
}
export interface ErrorType extends Error {
  status: number;
}
export interface Ires {
  email?: string;
  firstName?: string;
  lastName?: string;
}
export interface Ires1 {
  date: string;
  doctorId: number;
  timeType: string;
  patientId: number;
  statusId: string;
}
export interface Ires2 {
  fullName: string;
  position: string;
  id: number;
}
export interface IdataRes<T> {
  errCode?: number;
  message?: string;
  data?: T | {};
}
