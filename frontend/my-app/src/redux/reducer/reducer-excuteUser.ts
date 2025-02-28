import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  IallCode,
  IallCode1,
  IallCodeData,
  IdataDetailDoctor,
  IinforDoctor,
  Iuser,
} from "../../constants/interface";
import servicesSystem from "../../services/system";
import service_Home from "../../services/home";
import ServiceSpeciality from "../../services/service-speciality";
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
  isLoadingCreateDoctor?: boolean;
  listInforDoctor: IdataDetailDoctor<IinforDoctor<IallCodeData>>;
  modalInforDoctor: IdataDetailDoctor<Iuser<IinforDoctor<IallCodeData>>>;
  listPatient: IallCode<IlistPatient>;
  loadingGetPatient: boolean;
}
export interface iResponseDoctor {
  data?: IresDoctor;
  errCode?: number;
  message?: string;
}
export interface IlistPatient {
  id: any;
  statusId: any;
  doctorId: any;
  patientId: any;
  date: any;
  token: any;
  timeType: any;
  createdAt: any;
  updatedAt: any;
  doctorBooking: {
    email: any;
    firstName: any;
    lastName: any;
    address: any;
    phoneNumber: any;
    gender: any;
    genderAllcode: {
      valueEn: any;
      valueVi: any;
    };
  };
  allCode: {
    valueEn: any;
    valueVi: any;
  };
}
const initialState: Partial<CounterState> = {
  data: [],
  isLoading: true,
  message: "",
  dataDoctor: { count: 0, rows: [] },
  dataDoctorWithoutImage: { count: 0, rows: [] },
  isLoadingCreateDoctor: true,
  loadingGetPatient: false,
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

export const createDoctor = createAsyncThunk(
  "fetch/createDoctor",
  async (user: Partial<Iuser<string>>): Promise<IallCode1<number>> => {
    const response = await servicesSystem.createUswer(user);
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

export const getAllSchedualPatient = createAsyncThunk(
  "fetch/getAllSchedualPatient",
  async (id: any): Promise<IallCode<IlistPatient>> => {
    const response = await servicesSystem.getAllPatientForDoctor(id);
    return response;
  }
);
export const getInforDoctor = createAsyncThunk(
  "fetch/fetchInforDoctor",
  async (id: any) => {
    try {
      const response = await servicesSystem.fetchInforDoctor(id);
      return response;
    } catch (error) {}
  }
);
export const fetchModalsDoctor = createAsyncThunk(
  "fetch/fetchModalsDoctor",
  async (id: any) => {
    try {
      console.log(1);
      const response = await servicesSystem.fetchModalsDoctor(id);
      return response;
    } catch (error) {}
  }
);
export const excuteUser = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    removeErrAndMess: (state) => {
      state.errCode = -1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllSchedualPatient.pending, (state, action) => {
      state.loadingGetPatient = true;
    });
    builder.addCase(getAllSchedualPatient.fulfilled, (state, action) => {
      state.listPatient = action.payload;
      state.loadingGetPatient = false;
    });
    builder.addCase(getAllSchedualPatient.rejected, (state, action) => {
      state.loadingGetPatient = false;
    });

    builder.addCase(getListUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getListUsers.fulfilled, (state, action) => {
      state.data = action.payload.data;
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

    builder.addCase(createDoctor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createDoctor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.errCode = action.payload.errCode;
    });
    builder.addCase(createDoctor.rejected, (state, action) => {
      state.isLoadingCreateDoctor = false;
    });

    builder.addCase(getInforDoctor.pending, (state, action) => {});
    builder.addCase(getInforDoctor.fulfilled, (state, action) => {
      state.listInforDoctor = action.payload;
    });
    builder.addCase(getInforDoctor.rejected, (state, action) => {});

    builder.addCase(fetchModalsDoctor.pending, (state, action) => {});
    builder.addCase(fetchModalsDoctor.fulfilled, (state, action) => {
      state.modalInforDoctor = action.payload;
    });
    builder.addCase(fetchModalsDoctor.rejected, (state, action) => {});
  },
});
export const { removeErrAndMess } = excuteUser.actions;
export const selectListUser = (state: RootState) => state.tableUser.data;
export const selectMessage = (state: RootState) => state.tableUser.message;
export const selectIsLoading = (state: RootState) => state.tableUser.isLoading;
export const selectErrCode = (state: RootState) => state.tableUser.errCode;
export const selectModalDoctor = (state: RootState) =>
  state.tableUser.modalInforDoctor;
export const selectInforDoctor = (state: RootState) =>
  state.tableUser.listInforDoctor;
export const selectIsLoadingCreateDoctor = (state: RootState) =>
  state.tableUser.isLoadingCreateDoctor;
export const selectListDoctor = (state: RootState) =>
  state.tableUser.dataDoctor;
export const selectListDoctorSystem = (state: RootState) =>
  state.tableUser.dataDoctorWithoutImage;

export const selectListPatient = (state: RootState) =>
  state.tableUser.listPatient;
export const selectLoadingPatient = (state: RootState) =>
  state.tableUser.loadingGetPatient;
export default excuteUser.reducer;
