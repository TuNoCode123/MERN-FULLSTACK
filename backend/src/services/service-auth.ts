import reqUser from "../respitory/req-User";
import { revertPassWord } from "../utils/generall/revertPassWord";
import { Idata, Ires } from "../utils/interfaces/interface-user";
class SevicesAuth {
  loginUser = async (email: string, passWord: string) => {
    const isEmail = await reqUser.findEmailIsExisted(email);
    let response: Idata<Ires> = {
      errCode: 0,
      message: "",
      data: {
        email: "",
        firstName: "",
        lastName: "",
      },
    };
    if (isEmail == 1) {
      response.errCode = 1;
      response.message = "email not existed";
      response.data = {};
    } else if (isEmail == 2) {
      response.errCode = 500;
      response.message = "server error";
      response.data = {};
    } else {
      const isTrue = revertPassWord(passWord, isEmail.passWord);
      if (isTrue) {
        const { passWord, ...otherProps } = isEmail;
        response.data = otherProps;
        response.message = `Login ${isEmail.email} successfully`;
      } else {
        response.errCode = 1;
        response.message = "passWord incorrect";
        response.data = {};
      }
    }
    return response;
  };
}
export default new SevicesAuth();
