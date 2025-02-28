import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  IallCode,
  IallCode1,
  IdataDetailDoctor,
  Ispeciality1,
} from "../../constants/interface";
import servicesSystem from "../../services/system";
import { Ispeciality } from "../../components/systems/speciality/manageSpeciality";
import ServiceSpeciality from "../../services/service-speciality";
import { FaLeaf } from "react-icons/fa6";
interface CounterState {
  isloading: boolean;
  isLoadingGetAllSpeciality: boolean;
  data: IallCode1<number>;
  listSpeciality?: IallCode<Ispeciality1>;
  detailSpeciality?: IdataDetailDoctor<Ispeciality1>;
  loadingActions: boolean;
  resAction?: IallCode1<number>;
}

const initialState: CounterState = {
  isloading: false,
  data: {
    errCode: -1,
    message: "",
  },
  isLoadingGetAllSpeciality: false,
  loadingActions: false,
  resAction: {
    errCode: -1,
    message: "",
  },
};
export const createSpeciality = createAsyncThunk(
  "login/createSpeciality",
  async (inforSpeciality: Ispeciality): Promise<IallCode1<number>> => {
    const response = await servicesSystem.creatNewSpeciality(inforSpeciality);
    return response;
  }
);

export const getAllSpeciality = createAsyncThunk(
  "login/getAllSpeciality",
  async (): Promise<IallCode<Ispeciality1>> => {
    const response = await servicesSystem.fetchAllSpeciality();
    return response;
  }
);

export const getSpecialityByid = createAsyncThunk(
  "speciality/getSpecialityByid",
  async (id: any) => {
    const response = await ServiceSpeciality.getSpecialityById(id);
    return response;
  }
);

export const updateSpeciality = createAsyncThunk(
  "speciality/updateSpeciality",
  async (data: any): Promise<IallCode1<number>> => {
    const response = await ServiceSpeciality.actionsSpeciality(data);
    return response;
  }
);
export const specialitySlice = createSlice({
  name: "createSpeciality",
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
    builder.addCase(createSpeciality.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(createSpeciality.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });
    builder.addCase(createSpeciality.rejected, (state, action) => {
      state.isloading = false;
    });

    builder.addCase(getAllSpeciality.pending, (state, action) => {
      state.isLoadingGetAllSpeciality = true;
    });
    builder.addCase(getAllSpeciality.fulfilled, (state, action) => {
      state.isLoadingGetAllSpeciality = false;
      state.listSpeciality = action.payload;
    });
    builder.addCase(getAllSpeciality.rejected, (state, action) => {
      state.isLoadingGetAllSpeciality = false;
    });

    builder.addCase(getSpecialityByid.pending, (state, action) => {});
    builder.addCase(getSpecialityByid.fulfilled, (state, action) => {
      state.isloading = false;
      state.detailSpeciality = action.payload;
    });
    builder.addCase(getSpecialityByid.rejected, (state, action) => {});

    builder.addCase(updateSpeciality.pending, (state, action) => {
      state.loadingActions = true;
    });
    builder.addCase(updateSpeciality.fulfilled, (state, action) => {
      state.loadingActions = false;
      state.resAction = action.payload;
    });
    builder.addCase(updateSpeciality.rejected, (state, action) => {
      state.loadingActions = false;
    });
  },
});

export const { resetCreate } = specialitySlice.actions;
export const selectIsLoading = (state: RootState) => state.speciality.isloading;
export const selectIsLoadingActions = (state: RootState) =>
  state.speciality.loadingActions;
export const selectIsLoadingFetchAll = (state: RootState) =>
  state.speciality.isLoadingGetAllSpeciality;
export const selectIsData = (state: RootState) => state.speciality.data;
export const selectSpeciality = (state: RootState) =>
  state.speciality.listSpeciality;
export const selectDetailSpeciality = (state: RootState) =>
  state.speciality.detailSpeciality;
export const selectResActions = (state: RootState) =>
  state.speciality.resAction;
export default specialitySlice.reducer;
