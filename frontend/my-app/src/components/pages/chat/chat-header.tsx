import { useContext } from "react";
import ChatApp, {
  ChatContext,
  useChatContext,
} from "../../context/context-chat";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ChatHeader = () => {
  const { inforUser } = useChatContext();
  const nav = useNavigate();
  return (
    <div
      className="header-content"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
        padding: "0 10px",
      }}
    >
      <div className="content-left" style={{ fontSize: "25px" }}>
        Support Chat
      </div>
      <div
        className="content-right"
        style={{ display: "flex", alignItems: "center", gap: "15px" }}
      >
        <span style={{ fontSize: "25px" }}>
          {inforUser &&
            `login with name as,   ${inforUser?.data.firstName}  ${inforUser?.data.lastName}`}
        </span>
        <span
          style={{
            display: "inline-block",
            width: "25px",
            height: "25px",
            cursor: "pointer",
          }}
          onClick={() => nav("/")}
        >
          <IoMdLogOut style={{ width: "100%", height: "100%", color: "red" }} />
        </span>
      </div>
    </div>
  );
};
export default ChatHeader;
