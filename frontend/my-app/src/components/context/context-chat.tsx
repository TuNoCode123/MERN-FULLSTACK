import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { selectUserInfor } from "../../redux/reducer/reducer-login";
import {
  addMess,
  getAllChat,
  getAllMess,
  selectDataMes,
  selectListRoom,
  selectNewMess,
} from "../../redux/reducer/reducer-chat";
import {
  getListUsers,
  selectListUser,
} from "../../redux/reducer/reducer-excuteUser";
import service_Chat from "../../services/chat";
import { io, Socket } from "socket.io-client";
import { PORTSOCKET } from "../../constants/path";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../../../typeSocket";
import { getIdPartner } from "../../hooks/getInforPartner";
import _ from "lodash";

interface AppContextType {
  inforUser: any;
  listRooms?: any;
  user?: any;
  listUsers?: any;
  handlerOnclickRenderChat: any;
  listMess: any;
  currentChat: any;
  userOnline?: {
    socketId?: string;
    userId?: number;
  }[];
  notification: {
    date: Date;
    senderId: number;
    text: string;
  }[];
}
export const ChatContext = createContext<AppContextType | undefined>(undefined);
export default function ChatApp({ children }: { children: ReactNode }) {
  const [userOnline, setUserOnline] = useState<
    {
      socketId?: string;
      userId?: number;
    }[]
  >();
  const inforUser = useAppSelector(selectUserInfor);
  const [currentChat, setCurrentChat] = useState<any>();
  const [notification, setNotification] = useState<
    {
      date: Date;
      senderId: number;
      text: string;
    }[]
  >([]);
  const listRooms = useAppSelector(selectListRoom);
  // console.log(listRooms);
  const listUsers = useAppSelector(selectListUser);
  const listMess = useAppSelector(selectDataMes);
  const user = useAppSelector(selectUserInfor);
  const newMessage = useAppSelector(selectNewMess);
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const dispath = useAppDispatch();
  useEffect(() => {
    dispath(getAllChat({ id: inforUser?.data.id }));
    dispath(getListUsers());
  }, [inforUser]);
  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:5000"
    );
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!socket) return;
    if (inforUser) socket.emit("online", inforUser.data.id);
  }, [socket, inforUser?.data.id]);
  useEffect(() => {
    if (!socket) return;
    socket.on("totalUserOnline", (userOnline) => {
      setUserOnline(userOnline);
    });
    socket.on("receiverMess", (data) => {
      if (currentChat && currentChat._id == data.roomId) {
        dispath(addMess(data));
      }
    });
    socket.on("notification", (data) => {
      const isTrueChat = currentChat?.members.some((m: any) => {
        return m == data.senderId;
      });
      if (isTrueChat) return;
      setNotification((pre) => [...pre, data]);
    });
    return () => {
      socket.off("totalUserOnline");
      socket.off("receiverMess");
      socket.off("notification");
    };
  }, [socket, currentChat]);
  // useEffect(() => {
  //   console.log("----->", notification);
  // }, [notification]);
  useEffect(() => {
    if (!socket || !currentChat || !inforUser) return;
    const receiverId = getIdPartner(currentChat, inforUser?.data.id);

    if (newMessage) {
      socket.emit("sentMess", { receiverId, mess: newMessage });
    }
  }, [socket, newMessage]);

  const handlerOnclickRenderChat = async (id1: any, id2: any) => {
    const desireChat = await service_Chat.findChat(id1, id2);
    const id = desireChat?.data._id;
    setCurrentChat(desireChat.data);
    dispath(getAllMess({ id }));
    let tNotification = _.cloneDeep(notification);
    let modifiNotification = tNotification.filter((n) => n.senderId != id1);
    setNotification(modifiNotification);
  };
  return (
    <>
      <ChatContext.Provider
        value={{
          inforUser,
          listRooms,
          user,
          listUsers,
          handlerOnclickRenderChat,
          listMess,
          currentChat,
          userOnline,
          notification,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
}
export const useChatContext = (): AppContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
