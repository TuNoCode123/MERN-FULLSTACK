export interface Ilogin {
  errCode: number;
  message: string;
  data: {
    email: string;
    lastName: number;
    firstName: number;
  };
}
export interface IallCodeData extends Ispeciality1 {
  valueVi?: string;
  valueEn?: string;
  keyMap?: string;
  isSelected?: boolean;
  id?: number;
}

export interface IallCodeData1 extends Iclinic1 {
  valueVi?: string;
  valueEn?: string;
  keyMap?: string;
  isSelected?: boolean;
  id?: number;
}
export interface IallCode<T> {
  errCode?: number;
  message?: string;
  data: T[];
}
export interface Ispeciality1 {
  nameSpeciality: any;
  contentText: string;
  image: any;
  id?: number;
  contentHtml: string;
  specialityDoctor?: any[];
  createdAt?: any;
  updatedAt?: any;
}
export interface Iclinic1 {
  nameClinic: any;
  contentText: string;
  image: any;
  id?: number;
  contentHtml: string;
  clinicDoctor?: any[];
  createdAt?: any;
  updatedAt?: any;
}
export interface IallCode1<T> {
  errCode?: number;
  message?: string;
  data?: T[];
}
export interface IallCode2<T> {
  errCode: number;
  message: string;
  data: T[];
}
interface IschedualAllcodes {
  valueEn: string;
  valueVi: string;
  keyMap?: string;
}
export interface IchildSchedualAllcodes {
  schedualAllcodes: IschedualAllcodes;
  doctorId?: number;
  date: string;
}
export interface IdataDetailDoctor<T> {
  errCode: number;
  message: string;
  data: T;
}
export interface IinforDoctor<T> {
  doctorId: number;
  addressClinic: string;
  nameClinic: string;
  note?: string;
  price: T;
  provice: T;
  payment: T;
}
export interface Iuser<T> {
  id: number;
  email?: string;
  passWord: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  roleId?: T;
  spectialId?: T;
  images?: any;
  positionId?: T;
  position: IschedualAllcodes;
  role: T;
  image?: any;
  userMarkdown?: T;
  date?: any;
  specialityId: number;
  doctorInfor?: { userSpeciality: { nameSpeciality: string } };
}
export interface Imarkdown {
  contentHtml: string;
  contentText: string;
  contentIntroText: string;
  contentIntroHtml: string;
  doctorId?: number;
  clinicid?: number;
  specialityId?: number;
  action?: string;
  dataInfor?: {
    priceId: string | undefined;
    provinceId: string | undefined;
    paymentId: string | undefined;
    note?: string;
    doctorId?: number;
  };
}
export interface Ichat {
  data: any[];
}
export type Ifont = {
  roomId: string;
  senderId: number;
  text: string;
};
export interface IMess {
  data: Ifont[];
}
