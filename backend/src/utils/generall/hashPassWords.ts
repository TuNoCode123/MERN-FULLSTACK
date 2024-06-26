const bcrypt = require("bcrypt");
const hash = async (passWord: number | string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(passWord, salt);
  return hash;
};
export default hash;
