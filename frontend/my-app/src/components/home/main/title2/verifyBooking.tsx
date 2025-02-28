import { useParams, useSearchParams } from "react-router-dom";
import { languages } from "../../../../constants/languages";
import { useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import { verify } from "../../../../services/patient";
import Header from "../../header/header";
import "./bookingVerify.scss";
import { useEffect, useState } from "react";

const VerifyBooking = () => {
  const language = useAppSelector(selectLanguage);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const doctorId = searchParams.get("doctorId");
  const [errCode, setErrCode] = useState<number>(0);
  const hanlerVerify = async () => {
    try {
      if (!token || !doctorId) return;
      const res = await verify(token, +doctorId);
      if (res && res.errCode) {
        setErrCode(res.errCode);
      }
    } catch (error) {}
  };
  useEffect(() => {
    hanlerVerify();
  }, [token, doctorId]);
  return (
    <>
      <div className="verify-container">
        <div className="header">
          <Header />
        </div>
        <div className="des">
          {language == languages.vi
            ? errCode == 0
              ? "Cảm ơn bạn đã xác nhận , vui lòng hãy đến đúng giờ khám!!!"
              : "Bạn đã xác nhận lịch khám này rồi!!!!"
            : errCode == 0
            ? "Thank you , You verified , let you go to there on times"
            : "You verified this calender!!!!"}
        </div>
      </div>
    </>
  );
};
export default VerifyBooking;
