import AllCodes from "../models/model-allCode";

class ServicesAllcode {
  getType = async (type: string) => {
    try {
      const res = await AllCodes.findAll({
        raw: true,
        where: {
          type,
        },
      });
      return res;
    } catch (error) {
      return [];
    }
  };
}
export default new ServicesAllcode();
