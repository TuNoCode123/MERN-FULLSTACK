import { useContext, useEffect, useState } from "react";
import "./chatMain.scss";
import Message from "./message";
import { FaUserCircle } from "react-icons/fa";
import { ChatContext, useChatContext } from "../../context/context-chat";
import { getIdPartner } from "../../../hooks/getInforPartner";
import { map } from "lodash";
import moment from "moment";
const ChatMain = () => {
  const {
    listRooms,
    user,
    listUsers,
    handlerOnclickRenderChat,
    userOnline,
    notification,
    currentChat,
  } = useChatContext();
  const [click, setClick] = useState<string>();

  // useEffect(() => {
  //   console.log(notification);
  // }, [notification]);
  const handlerOnclick = (selectUser: any, item: any) => {
    handlerOnclickRenderChat(selectUser.id, user.data.id);
    setClick(item._id);
  };
  const restrictText = (text: string) => {
    let desireText = text.slice(0, 20);
    if (text.length > 20) {
      desireText = desireText + "...";
    }
    return desireText;
  };
  return (
    <div className="main-container">
      <div className="m-left">
        {listRooms &&
          listRooms.data.length > 0 &&
          listRooms.data.map((item: any, index: number) => {
            const selectUser = listUsers.find(
              (u: any) => u.id == getIdPartner(item, user.data.id)
            );
            let isOnline = false;
            if (userOnline) {
              isOnline = userOnline.some((u) => u.userId == selectUser.id);
            }
            let selfNotifition: {
              date: Date;
              senderId: number;
              text: string;
            }[] = [];
            notification?.map((n) => {
              const member = [+n.senderId, user?.data.id];
              const isNotify = item.members.every((i: any) => {
                return member.includes(i);
              });

              if (isNotify) selfNotifition.push(n);
            });
            return (
              <>
                <div
                  className={click == item._id ? "user click" : "user"}
                  onClick={() => handlerOnclick(selectUser, item)}
                  key={index}
                >
                  <div className="i-left">
                    <FaUserCircle />
                  </div>
                  <div className="i-right">
                    <div className="ir-left">
                      <div className="name">
                        {selectUser?.firstName + " " + selectUser?.lastName}
                      </div>
                      <div className="text">
                        {selfNotifition &&
                          selfNotifition.length > 0 &&
                          restrictText(
                            selfNotifition[selfNotifition.length - 1].text
                          )}
                      </div>
                    </div>
                    <div className="ir-right">
                      {selfNotifition && selfNotifition.length > 0 ? (
                        <div className="ntf">{selfNotifition.length}</div>
                      ) : (
                        ""
                      )}

                      <div className="date" style={{ fontSize: "12px" }}>
                        {" "}
                        {selfNotifition &&
                          selfNotifition.length > 0 &&
                          moment(
                            selfNotifition[selfNotifition.length - 1].date
                          ).calendar()}
                      </div>
                    </div>
                    {isOnline && <div className="online"></div>}
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="m-right">
        {currentChat ? (
          <Message />
        ) : (
          <>
            <div className="chat">don't any chat</div>
            <div className="chat1">
              Please click on any conversation to chat
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMain;
