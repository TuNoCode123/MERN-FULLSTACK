import { CSSProperties, useEffect, useState } from "react";
import service_Payment from "../../../../services/payment";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader, SyncLoader } from "react-spinners";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const CompleteOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nav = useNavigate();
  const token = searchParams.get("token");
  const doctorId = searchParams.get("doctorId");
  const patientId = searchParams.get("patientId");
  const hanlderCompleteOrder = async () => {
    const res = await service_Payment.completeOrder(token, doctorId, patientId);
    if (res.errCode == 0) {
      toast.success("payment success");
      nav("/");
    }
  };
  useEffect(() => {
    hanlderCompleteOrder();
  }, []);
  return (
    <>
      {" "}
      <div
        style={{
          width: "max-content",
          height: "max-content",
          margin: "0 auto",
        }}
      >
        <div className="mb-3" style={{ fontSize: "25px", fontWeight: "600" }}>
          Bạn Vui Lòng Đợi Thanh Toán
        </div>
        <div
          style={{
            width: "max-content",
            height: "max-content",
            margin: "0 auto",
          }}
        >
          <SyncLoader
            color={"#36d7b7"}
            loading={true}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </>
  );
};
export default CompleteOrder;
