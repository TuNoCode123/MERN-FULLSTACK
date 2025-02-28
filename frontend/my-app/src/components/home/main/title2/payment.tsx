import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { languages } from "../../../../constants/languages";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import { verify } from "../../../../services/patient";
import Header from "../../header/header";
import "./payment.scss";
import { CSSProperties, useEffect, useRef, useState } from "react";
import paypal from "../../../../assert/paypal.webp";
import stripe from "../../../../assert/stripe.png";
import service_Payment from "../../../../services/payment";
import {
  payment,
  resetStage,
  selectDataPayment,
  selectIsLoadingPayment,
} from "../../../../redux/reducer/reducer-payment";
import ClipLoader from "react-spinners/ClipLoader";
import { RingLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const patientId = searchParams.get("patientId");
  const containerRef = useRef<HTMLDivElement>(null);

  const load = useAppSelector(selectIsLoadingPayment);
  const dispath = useAppDispatch();
  const hanlderPayment = async () => {
    dispath(payment({ doctorId, patientId }));
  };
  const dataPayment = useAppSelector(selectDataPayment);

  if (dataPayment?.errCode == 0) {
    const url = new URL(dataPayment.data);
    if (doctorId) {
      url.searchParams.set("doctorId", doctorId);
    }
    if (patientId) {
      url.searchParams.set("patientId", patientId);
    }
    window.location.href = url.toString();
    dispath(resetStage());
  }
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const centerX = (container.scrollWidth - container.clientWidth) / 2;
      const centerY = (container.scrollHeight - container.clientHeight) / 2;
      container.scrollTo(centerX, centerY);
    }
  }, []);

  const hanlderOnlick = () => {
    hanlderPayment();
  };
  return (
    <>
      <div className="verify-container" ref={containerRef}>
        <div className="header">
          <Header />
        </div>
        {!load ? (
          <div className="des1">
            <div className="payment">
              <div className="p-child">
                <img src={paypal} onClick={hanlderOnlick}></img>
              </div>
              <div className="p-child">
                <img src={stripe} onClick={hanlderOnlick}></img>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "max-content",
              height: "max-content",
              margin: "100px auto",
            }}
          >
            <div
              style={{
                fontSize: "25px",
                fontWeight: "600",
                marginBottom: "50px",
              }}
            >
              Loading into Paypal!!!
            </div>
            <RingLoader
              color={"rgb(50, 208, 176)"}
              loading={true}
              cssOverride={override}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              speedMultiplier={2}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Payment;
