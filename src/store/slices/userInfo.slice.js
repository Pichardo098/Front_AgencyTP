import { createSlice } from "@reduxjs/toolkit";
import { axiosAgencyTp } from "../../utils/configureAxios";
import { useNavigate } from "react-router-dom";

const initialState = {
  token: "",
  user: null,
};

const userInfoSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("userInfo")) ?? initialState,
  name: "userInfo",
  reducers: {
    setUserInfo: (state, action) => {
      const responseLogin = action.payload;
      const newState = { ...state, ...responseLogin };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return newState;
    },
    logout: (state) => {
      const newState = {
        ...state,
        ...initialState,
      };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { setUserInfo, logout } = userInfoSlice.actions;

export const loginUser = (dataForm) => (dispatch) => {
  axiosAgencyTp
    .post("/users/login", dataForm)
    .then(({ data }) => dispatch(setUserInfo(data)))
    .catch((err) => window.alert("Credenciales no válidas"));
};

export default userInfoSlice.reducer;
