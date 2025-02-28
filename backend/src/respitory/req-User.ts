import { ErrorType, userType } from "../utils/interfaces/interface-user";
import User from "../models/model-user";

interface ReqMethodsUser {
  findAllUser: (user?: User) => Promise<User[]>;
  findOneUserById: (userId: number) => Promise<User>;
  updateUser: (user: userType) => Promise<number | string>;
  createUser: (user: userType) => Promise<[User | boolean, boolean]>;
  deleteUserRq: (userId: number) => Promise<number | string>;
  findEmailIsExisted: (email: string) => Promise<User | number>;
}
class MethodUsers implements ReqMethodsUser {
  updateUser = async (user: userType) => {
    try {
      const { id, ...objUser } = user;
      const res: Array<number> = await User.update(
        {
          ...objUser,
        },
        { where: { id } }
      );
      return res[0];
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
  createUser = async (user: userType): Promise<[any | boolean, boolean]> => {
    try {
      const [userNew, created] = await User.findOrCreate({
        where: { email: user.email },
        defaults: {
          ...user,
        },
        raw: true,
        nest: true,
      });
      return [userNew, created];
    } catch (error) {
      return [false, false];
    }
  };
  deleteUserRq = async (userId: number) => {
    try {
      const response = await User.destroy({
        where: {
          id: userId,
        },
      });
      if (response) {
        return response;
      }
      return "/";
    } catch (error) {
      return "";
    }
  };
  findAllUser = async () => {
    try {
      return await User.findAll({
        attributes: {
          exclude: ["passWord", "createdAt", "updatedAt"],
        },
      });
    } catch (error) {
      return [];
    }
  };
  findOneUserById = async (userId: number) => {
    try {
      const res = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!res) {
        throw new Error("id dont exist");
      }
      return res;
    } catch (error) {
      throw new Error("id dont exist");
    }
  };
  findEmailIsExisted = async (email: string) => {
    try {
      const response = await User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
      if (!response) {
        return 1;
      }
      return response;
    } catch (error) {
      return 2;
    }
  };
}
const reqUser = new MethodUsers();
export default reqUser;
