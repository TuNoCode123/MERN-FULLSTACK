const moment = require("moment-timezone");
const momentParser = (time: Date) => {
  if (time) {
    let timer = moment
      .tz(time, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)", "Asia/Ho_Chi_Minh")
      .format("DD/MM/YYYY");
    return timer;
  }
};
export default momentParser;
