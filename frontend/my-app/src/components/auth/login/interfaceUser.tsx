import { Dispatch, SetStateAction } from "react";
import image from "../../../assert/happy-man-points-out-something-presentation-showing-element-advertising-goods-vector-illustration-cartoon-style-119680930.webp";
import { RiCheckboxCircleFill } from "react-icons/ri";
const Interface = ({
  touch,
  setTouch,
}: {
  touch: boolean;
  setTouch: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={!touch ? "container-interface" : "container-interface active"}
    >
      <img src={image} onClick={() => setTouch(true)}></img>
      <div className="icon-i">
        <RiCheckboxCircleFill />
      </div>
    </div>
  );
};
export default Interface;
