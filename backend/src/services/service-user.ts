import { resolve } from "path";
import User from "../models/model-user";
import reqUser from "../respitory/req-User";
import { userType } from "../utils/interfaces/interface-user";
import AllCodes from "../models/model-allCode";
interface Ires {
  rows: User[];
  count: number;
}
class ServiceUser {
  updateUser = (user: userType): Promise<number | string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await reqUser.updateUser(user);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };
  createUser = (user: userType): Promise<[userType | boolean, boolean]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const [userNew, created] = await reqUser.createUser(user);
        resolve([userNew, created]);
      } catch (error) {
        reject("");
      }
    });
  };
  deleteUser = (id: number): Promise<number | string> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const response = await reqUser.deleteUserRq(id);
        resolve(response);
      } catch (error) {}
    });
  };
  getAllDoctor = async (): Promise<Partial<Ires>> => {
    try {
      const response = await User.findAndCountAll({
        include: [
          {
            model: AllCodes,
            as: "position",
          },
          {
            model: AllCodes,
            as: "role",
          },
        ],
        where: { roleId: "R2" },
        attributes: {
          exclude: ["passWord"],
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return {};
    }
  };
  getAllDoctorWithoutImage = async (): Promise<Partial<Ires>> => {
    try {
      const response = await User.findAndCountAll({
        include: [
          {
            model: AllCodes,
            as: "position",
          },
          {
            model: AllCodes,
            as: "role",
          },
        ],
        where: { roleId: "R2" },
        attributes: {
          exclude: ["passWord", "image"],
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return {};
    }
  };
}
export default new ServiceUser();
