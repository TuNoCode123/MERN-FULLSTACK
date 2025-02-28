import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  IallCode,
  IallCode1,
  Iclinic1,
  IdataDetailDoctor,
  Ispeciality1,
} from "../../constants/interface";
import servicesSystem from "../../services/system";
import ServiceSpeciality from "../../services/service-clinic";
import { Iclinic } from "../../components/systems/clinic/manageClinic";
import ServiceClinic from "../../services/service-clinic";
interface CounterState {
  isloading: boolean;
  isLoadingGetAllClinic: boolean;
  data: IallCode1<number>;
  listClinic?: IallCode<Iclinic1>;
  detailClinic?: IdataDetailDoctor<Iclinic1>;
  loadingActions: boolean;
  resAction?: IallCode1<number>;
}

const initialState: CounterState = {
  isloading: false,
  data: {
    errCode: -1,
    message: "",
  },
  isLoadingGetAllClinic: false,
  loadingActions: false,
  resAction: {
    errCode: -1,
    message: "",
  },
};
export const createClinic = createAsyncThunk(
  "login/createClinic",
  async (inforClinic: Iclinic): Promise<IallCode1<number>> => {
    const response = await servicesSystem.createNewClinic(inforClinic);
    return response;
  }
);

export const getAllClinic = createAsyncThunk(
  "login/getAllClinic",
  async (): Promise<IallCode<Iclinic1>> => {
    const response = await servicesSystem.fetchAllCinic();
    return response;
  }
);

export const getClinicByid = createAsyncThunk(
  "clinic/getClinicByid",
  async (id: any) => {
    const response = await ServiceClinic.getClinicById(id);
    return response;
  }
);

export const updateClinic = createAsyncThunk(
  "clinic/updateClinic",
  async (data: any): Promise<IallCode1<number>> => {
    const response = await ServiceClinic.actionsClinic(data);
    return response;
  }
);
export const clinicSlice = createSlice({
  name: "createClinic",
  initialState,
  reducers: {
    resetCreate: (state) => {
      state.data = {
        errCode: -1,
        message: "",
      };
      state.resAction = {
        errCode: -1,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createClinic.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(createClinic.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });
    builder.addCase(createClinic.rejected, (state, action) => {
      state.isloading = false;
    });

    builder.addCase(getAllClinic.pending, (state, action) => {
      state.isLoadingGetAllClinic = true;
    });
    builder.addCase(getAllClinic.fulfilled, (state, action) => {
      state.isLoadingGetAllClinic = false;
      state.listClinic = action.payload;
    });
    builder.addCase(getAllClinic.rejected, (state, action) => {
      state.isLoadingGetAllClinic = false;
    });

    builder.addCase(getClinicByid.pending, (state, action) => {});
    builder.addCase(getClinicByid.fulfilled, (state, action) => {
      state.isloading = false;
      state.detailClinic = action.payload;
    });
    builder.addCase(getClinicByid.rejected, (state, action) => {});

    builder.addCase(updateClinic.pending, (state, action) => {
      state.loadingActions = true;
    });
    builder.addCase(updateClinic.fulfilled, (state, action) => {
      state.loadingActions = false;
      state.resAction = action.payload;
    });
    builder.addCase(updateClinic.rejected, (state, action) => {
      state.loadingActions = false;
    });
  },
});

export const { resetCreate } = clinicSlice.actions;
export const selectIsLoading = (state: RootState) => state.clinic.isloading;
export const selectIsLoadingActions = (state: RootState) =>
  state.clinic.loadingActions;
export const selectIsLoadingFetchAllClinic = (state: RootState) =>
  state.clinic.isLoadingGetAllClinic;
export const selectIsDataClinic = (state: RootState) => state.clinic.data;
export const selectClinic = (state: RootState) => state.clinic.listClinic;
export const selectDetailClinic = (state: RootState) =>
  state.clinic.detailClinic;
export const selectResActions = (state: RootState) => state.clinic.resAction;
export default clinicSlice.reducer;
