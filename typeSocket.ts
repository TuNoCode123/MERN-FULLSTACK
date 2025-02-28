export interface ServerToClientEvents {
  totalUserOnline: (
    userOnline: {
      socketId?: string;
      userId?: number;
    }[]
  ) => void;
  receiverMess: (mess: {
    roomId: string;
    senderId: number;
    text: string;
  }) => void;
  notification: (data: { date: Date; senderId: number; text: string }) => void;
}

export interface ClientToServerEvents {
  online: (id: number) => void;
  sentMess: (data: {
    receiverId: any;
    mess: { roomId: string; senderId: number; text: string };
  }) => void;
}
