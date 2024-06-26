import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IallCodeData, Iuser } from "../../constants/interface";
import servicesSystem from "../../services/system";
import service_Home from "../../services/home";
interface IresDoctor {
  count: number;
  rows: Partial<Iuser<IallCodeData>[]>;
}
export interface CounterState {
  data: Partial<Iuser<string>[]>;
  errCode: number;
  isLoading?: boolean;
  message: string;
  dataDoctor: IresDoctor;
  dataDoctorWithoutImage: IresDoctor;
}
export interface iResponseDoctor {
  data?: IresDoctor;
  errCode?: number;
  message?: string;
}

const initialState: Partial<CounterState> = {
  data: [],
  isLoading: true,
  message: "",
  dataDoctor: { count: 0, rows: [] },
  dataDoctorWithoutImage: { count: 0, rows: [] },
};
export const getListUsers = createAsyncThunk(
  "fetch/fetchAllUser",
  async (): Promise<Partial<CounterState>> => {
    const response = await servicesSystem.getAllUser();
    return response;
  }
);

export const fetchAllDoctor = createAsyncThunk(
  "fetch/fetchAllDoctor",
  async (): Promise<Partial<iResponseDoctor>> => {
    const response = await service_Home.getAllDoctor();
    return response;
  }
);

export const fetchAllDoctorSystem = createAsyncThunk(
  "fetch/fetchAllDoctorSystem",
  async (): Promise<Partial<iResponseDoctor>> => {
    const response = await servicesSystem.getAllDoctorWithoutImage();
    return response;
  }
);
export const excuteUser = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getListUsers.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.errCode = action.payload.errCode;
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(getListUsers.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchAllDoctor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllDoctor.fulfilled, (state, action) => {
      state.dataDoctor = action.payload.data;
      state.errCode = action.payload.errCode;
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(fetchAllDoctor.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchAllDoctorSystem.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllDoctorSystem.fulfilled, (state, action) => {
      state.dataDoctorWithoutImage = action.payload.data;
      state.errCode = action.payload.errCode;
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(fetchAllDoctorSystem.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const selectListUser = (state: RootState) => state.tableUser.data;
export const selectMessage = (state: RootState) => state.tableUser.message;
export const selectIsLoading = (state: RootState) => state.tableUser.isLoading;
export const selectErrCode = (state: RootState) => state.tableUser.errCode;
export const selectListDoctor = (state: RootState) =>
  state.tableUser.dataDoctor;
export const selectListDoctorSystem = (state: RootState) =>
  state.tableUser.dataDoctorWithoutImage;
export default excuteUser.reducer;
