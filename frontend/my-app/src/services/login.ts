import instance from "../config/axios";
import { IdataDetailDoctor, Ilogin, Iuser } from "../constants/interface";

export const loginUser = async (email: string, passWord: string) => {
  const res: IdataDetailDoctor<Iuser<string>> = await instance.post("/login", {
    email,
    passWord,
  });
  return res;
};
