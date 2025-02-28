import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  Ichat,
  IdataDetailDoctor,
  Ifont,
  Ilogin,
  IMess,
  Iuser,
} from "../../constants/interface";
import { loginUser } from "../../services/login";
import { languages } from "../../constants/languages";
import service_Chat from "../../services/chat";
import _ from "lodash";
interface CounterState {
  listRooms?: Ichat;
  dataMess?: Ifont[];
  newMess?: Ifont;
  dataAI?: any;
  isLoadingResFromAi: boolean;
}

const initialState: CounterState = { dataMess: [], isLoadingResFromAi: true };
export const getAllChat = createAsyncThunk(
  "login/getAllChat",
  async ({ id }: { id: any }) => {
    const response = await service_Chat.getAllChat(id);
    return response;
  }
);

export const getAllMess = createAsyncThunk(
  "login/getAllMess",
  async ({ id }: { id: any }) => {
    const response = await service_Chat.getAllMess(id);
    return response;
  }
);

export const performChatWithAi = createAsyncThunk(
  "login/performChatWithAi",
  async ({ text, img }: { text: any; img: any }) => {
    const response = await service_Chat.chatAi(text, img);
    return response;
  }
);

export const createMess = createAsyncThunk(
  "login/createMess",
  async ({
    roomId,
    senderId,
    text,
  }: {
    roomId: any;
    senderId: any;
    text: any;
  }) => {
    const response = await service_Chat.createMess(roomId, senderId, text);
    return response;
  }
);
export const chatSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addMess: (state, action) => {
      state.dataMess?.push(action.payload);
      console.log(state.dataMess);
    },
    changeStateLoading: (state) => {
      state.isLoadingResFromAi = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChat.pending, (state, action) => {});
    builder.addCase(getAllChat.fulfilled, (state, action) => {
      state.listRooms = action.payload;
    });
    builder.addCase(getAllChat.rejected, (state, action) => {});

    builder.addCase(getAllMess.pending, (state, action) => {});
    builder.addCase(getAllMess.fulfilled, (state, action) => {
      state.dataMess = action.payload;
    });
    builder.addCase(getAllMess.rejected, (state, action) => {});

    builder.addCase(createMess.pending, (state, action) => {});
    builder.addCase(createMess.fulfilled, (state, action) => {
      state.dataMess?.push(action.payload);
      state.newMess = action.payload;
    });
    builder.addCase(createMess.rejected, (state, action) => {});

    builder.addCase(performChatWithAi.pending, (state, action) => {
      state.isLoadingResFromAi = true;
    });
    builder.addCase(performChatWithAi.fulfilled, (state, action) => {
      state.dataAI = action.payload;
      state.isLoadingResFromAi = false;
    });
    builder.addCase(performChatWithAi.rejected, (state, action) => {
      state.isLoadingResFromAi = false;
    });
  },
});
export const { addMess, changeStateLoading } = chatSlice.actions;
export const selectListRoom = (state: RootState) => state.chat.listRooms;
export const selectDataMes = (state: RootState) => state.chat.dataMess;
export const selectNewMess = (state: RootState) => state.chat.newMess;
export const selectResponsefromAi = (state: RootState) => state.chat.dataAI;
export const selectIsLoadingResFromAi = (state: RootState) =>
  state.chat.isLoadingResFromAi;

export default chatSlice.reducer;
