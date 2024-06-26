const bcrypt = require("bcrypt");
export const revertPassWord = (passWord: string, hash: string): boolean => {
  const isCorrect = bcrypt.compareSync(passWord, hash);
  return isCorrect;
};
