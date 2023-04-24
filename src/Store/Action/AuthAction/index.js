import { AUTH, AUTHFAILED } from "../../ActionTypes/index";
import axios from "axios";

export const userLogin = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://inventory-management-backend.onrender.com/login ",
      data
    );

    dispatch({
      type: AUTH,

      payload: { data: res.data },
    });
  } catch (error) {
    let status = { status: "server_offline" };
    dispatch({
      type: AUTHFAILED,
      payload: { data: error?.response?.data || status },
    });
  }
};
