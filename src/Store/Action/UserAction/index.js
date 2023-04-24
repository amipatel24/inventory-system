import {
  USER_LIST,
  USER_DELTE_LIST,
  FAILED_ADMIN_LIST,
  USER_DELETE,
  USER_GET_BY_UUID,
  USER_ADD,
  LIST_LOADER,
} from "../../ActionTypes/index";
import axios from "axios";

export const userListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get("https://inventory-management-backend.onrender.com/users", {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search ? data.search : null,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      })
      .then((res) => {
        dispatch({
          type: USER_LIST,
          payload: res.data,
        });
      });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const userGetByuuidAction = (user_uuid) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const userList = await axios.get(
      `https://inventory-management-backend.onrender.com/users/${user_uuid}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: USER_GET_BY_UUID,
      payload: userList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const userDelteListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get("https://inventory-management-backend.onrender.com/delete/users", {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search ? data.search : null,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      })
      .then((res) => {
        dispatch({
          type: USER_DELTE_LIST,
          payload: res.data,
        });
      });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const userDeleteAction = (user_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const userList = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/users/${user_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: USER_DELETE,
      payload: userList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const UserAddAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const UserAdd = await axios.post(
      "https://inventory-management-backend.onrender.com/users",
      data,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: USER_ADD,
      payload: UserAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
