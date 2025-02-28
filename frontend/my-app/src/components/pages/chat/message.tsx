import { useContext, useEffect, useState } from "react";
import "./message.scss";
import InputEmoji from "react-input-emoji";
import { BsFillSendFill } from "react-icons/bs";
import { ChatContext, useChatContext } from "../../context/context-chat";
import moment from "moment";
import { useAppDispatch } from "../../../redux/hook";
import { createMess } from "../../../redux/reducer/reducer-chat";
import { getIdPartner } from "../../../hooks/getInforPartner";
interface Props {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  cleanOnEnter: boolean;
  onEnter: (text: any) => void;
  placeholder: string;
  shouldReturn?: boolean;
  shouldConvertEmojiToImage?: boolean;
}
const Message = () => {
  const [text, setText] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>();
  const dispath = useAppDispatch();
  const {
    listRooms,
    user,
    listUsers,
    handlerOnclickRenderChat,
    listMess,
    currentChat,
  } = useChatContext();
  function handleOnEnter() {
    dispath(
      createMess({
        roomId: currentChat?._id,
        senderId: user?.data.id,
        text,
      })
    );
    setText("");
  }
  useEffect(() => {
    if (!currentChat) return;
    const getId = getIdPartner(currentChat, user.data.id);
    const desireUser = listUsers.find((l: any) => l.id == getId);
    setCurrentUser(desireUser);
  }, [currentChat]);
  useEffect(() => {
    const el = document.querySelector(".mes-main");
    el?.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  });
  return (
    <div className="mess-container">
      <div className="mes-header">
        <span>
          {currentUser
            ? currentUser.firstName + " " + currentUser.lastName
            : ""}
        </span>
      </div>
      {currentChat ? (
        <>
          <div className="mes-main">
            {listMess &&
              listMess.length > 0 &&
              listMess.map((item: any, index: any) => {
                return (
                  <>
                    {" "}
                    <div
                      className={
                        item?.senderId == user?.data.id
                          ? "messages self"
                          : "messages"
                      }
                    >
                      <div className="text">
                        <span>{item?.text}</span>
                      </div>
                      <div className="time">
                        {moment(item?.createdAt).calendar()}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="mes-input">
            <div className="input">
              <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
                shouldReturn={false} // Giá trị mặc định
                shouldConvertEmojiToImage={false} // Giá trị mặc định
                keepOpened={true}
              />
            </div>
            <div className="icon" onClick={() => handleOnEnter()}>
              <BsFillSendFill />
            </div>
          </div>
        </>
      ) : (
        "dont any chat"
      )}
    </div>
  );
};

export default Message;
