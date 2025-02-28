import { NumericFormat } from "react-number-format";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import "./inforCalender.scss";
import { languages } from "../../../../constants/languages";
import { useEffect, useState } from "react";
import servicesSystem from "../../../../services/system";
import {
  IallCodeData,
  IdataDetailDoctor,
  IinforDoctor,
} from "../../../../constants/interface";
import {
  getInforDoctor,
  selectInforDoctor,
} from "../../../../redux/reducer/reducer-excuteUser";
interface IinforCalender {
  id: any;
}

const InforCalender = ({ id }: IinforCalender) => {
  const dispath = useAppDispatch();
  const [inforDoctor, setSetInforDoctor] =
    useState<IdataDetailDoctor<IinforDoctor<IallCodeData>>>();
  const hanlderGetInfor = async () => {
    const response = await servicesSystem.fetchInforDoctor(id);
    setSetInforDoctor(response);
  };
  useEffect(() => {
    if (!id) return;
    hanlderGetInfor();
  }, [id]);
  const language = useAppSelector(selectLanguage);
  const [close, setClose] = useState<boolean>(true);
  return (
    <>
      <div className="infor-container">
        {inforDoctor && inforDoctor.data && (
          <>
            <div className="content-right-up pb-2">
              <div className="child1">ĐỊA CHỈ KHÁM</div>
              <div className="child2">{inforDoctor.data.nameClinic}</div>
              <div className="child3">{inforDoctor.data.addressClinic}</div>
            </div>
            <div className="content-right-bottom">
              {close ? (
                <>
                  <div className="b-open">
                    <div className="b-child1">
                      <span className="b-fee">Giá Khám:</span>
                      <span>
                        {language == languages.vi ? (
                          <NumericFormat
                            value={inforDoctor.data.price.valueVi}
                            displayType="text"
                            thousandSeparator
                            suffix=" VND"
                          />
                        ) : (
                          <NumericFormat
                            value={inforDoctor.data.price.valueEn}
                            displayType="text"
                            thousandSeparator
                            suffix="$"
                          />
                        )}
                      </span>
                    </div>
                    <div className="b-detail">
                      <span
                        className="b-detail-child1"
                        onClick={() => setClose(!close)}
                      >
                        Xem Chi Tiết
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="b-drop">
                    <div className="d-fee">Giá Khám:</div>
                    <div className="d-table">
                      <div className="t-up">
                        <div className="t-left">
                          <div className="t-fee">Giá Khám</div>
                          <div className="t-note">{inforDoctor.data.note}</div>
                        </div>
                        <div className="t-right">
                          {language == languages.vi ? (
                            <NumericFormat
                              value={inforDoctor.data.price.valueVi}
                              displayType="text"
                              thousandSeparator
                              suffix=" VND"
                            />
                          ) : (
                            <NumericFormat
                              value={inforDoctor.data.price.valueEn}
                              displayType="text"
                              thousandSeparator
                              suffix="$"
                            />
                          )}
                        </div>
                      </div>
                      <div className="t-down">
                        Bệnh viện có thanh toán bằng hình thức tiền mặt và quẹt
                        thẻ
                      </div>
                    </div>
                    <div className="d-refuge" onClick={() => setClose(!close)}>
                      Ẩn Bảng Giá
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default InforCalender;
