import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CencalPayment = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const handlerNav = () => {
    nav(`/detailDoctor/${doctorId}`);
  };
  useEffect(() => {
    handlerNav();
  }, []);
  return <>loading</>;
};
export default CencalPayment;
