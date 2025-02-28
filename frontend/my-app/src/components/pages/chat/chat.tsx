import { useContext } from "react";
import ChatHeader from "./chat-header";
import "./chat.scss";
import { ChatContext } from "../../context/context-chat";
import ChatMain from "./chat-main";
import { useAppSelector } from "../../../redux/hook";
import { selectIsLogin } from "../../../redux/reducer/reducer-login";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const isLogin = useAppSelector(selectIsLogin);
  const nav = useNavigate();

  return (
    <div className="chat-container">
      <div className="header">
        <ChatHeader />
      </div>
      <div className="mainer">
        <ChatMain />
      </div>
    </div>
  );
};
export default Chat;
