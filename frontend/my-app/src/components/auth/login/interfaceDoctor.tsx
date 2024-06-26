import image from "../../../assert/doctor-cartoon-character_671039-847.avif";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react";
const InterfaceD = ({
  touch,
  setTouch,
}: {
  touch: boolean;
  setTouch: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={touch ? "container-interface" : "container-interface active"}
    >
      <img src={image} onClick={() => setTouch(false)}></img>
      <div className="icon-i">
        <RiCheckboxCircleFill />
      </div>
    </div>
  );
};
export default InterfaceD;
