import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IdataDetailDoctor, Ilogin, Iuser } from "../../constants/interface";
import { loginUser } from "../../services/login";
import { languages } from "../../constants/languages";
import service_Payment from "../../services/payment";
interface CounterState {
  isLoadingPayment: boolean;
  data?: IdataDetailDoctor<any>;
}

const initialState: CounterState = {
  isLoadingPayment: false,
};
export const payment = createAsyncThunk(
  "login/payment",
  async ({
    doctorId,
    patientId,
  }: {
    doctorId: any;
    patientId: any;
  }): Promise<IdataDetailDoctor<any>> => {
    const response = await service_Payment.payment(doctorId, patientId);
    return response;
  }
);
export const paymentSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetStage: (state) => {
      state.data = {
        errCode: -1,
        message: "fksdahf",
        data: "fdskahfkdsa",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(payment.pending, (state, action) => {
      state.isLoadingPayment = true;
    });
    builder.addCase(payment.fulfilled, (state, action) => {
      state.isLoadingPayment = false;
      state.data = action.payload;
    });
    builder.addCase(payment.rejected, (state, action) => {
      state.isLoadingPayment = false;
    });
  },
});
export const { resetStage } = paymentSlice.actions;
export const selectDataPayment = (state: RootState) => state.payment.data;
export const selectIsLoadingPayment = (state: RootState) =>
  state.payment.isLoadingPayment;
export default paymentSlice.reducer;
