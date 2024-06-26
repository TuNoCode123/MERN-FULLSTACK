import instance from "../config/axios";
import { Ilogin } from "../constants/interface";

export const loginUser = async (
  email: string,
  passWord: string
): Promise<Ilogin> => {
  const res: Ilogin = await instance.post("/login", {
    email,
    passWord,
  });
  return res;
};
