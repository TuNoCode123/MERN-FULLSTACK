import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IdataDetailDoctor, Ilogin, Iuser } from "../../constants/interface";
import { loginUser } from "../../services/login";
import { languages } from "../../constants/languages";
interface CounterState {
  islogin: boolean;
  userInfor?: IdataDetailDoctor<Iuser<string>>;
  typeLang: string;
}

const initialState: CounterState = {
  islogin: false,
  typeLang: languages.vi,
};
export const login = createAsyncThunk(
  "login/fetchLoginUser",
  async ({
    email,
    passWord,
  }: {
    email: string;
    passWord: string;
  }): Promise<IdataDetailDoctor<Iuser<string>>> => {
    const response = await loginUser(email, passWord);
    return response;
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    exchangeLanguage: (state, action: PayloadAction<string>) => {
      state.typeLang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.islogin = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.islogin = true;
      state.userInfor = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.islogin = true;
    });
  },
});
export const { exchangeLanguage } = loginSlice.actions;
export const selectUserInfor = (state: RootState) => state.login.userInfor;
export const selectIsLogin = (state: RootState) => state.login.islogin;
export const selectLanguage = (state: RootState) => state.login.typeLang;
export default loginSlice.reducer;
