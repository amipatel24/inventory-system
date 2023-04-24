import {
  PRODUCT_LIST,
  FAILED_ADMIN_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD,
  FAILED_ADD_PRODUCT,
  PRODUCT_DELETE,
  PRODUCT_EDIT_DATA,
  FAILED_EDIT_PRODUCT_DATA,
  PRODUCT_DELETE_LIST,
  PERMANENT_PRODUCT_DELETE,
  FAILED_PERMANENT_PRODUCT_DELTETE,
  LIST_LOADER,
} from "../../ActionTypes/index";
import axios from "axios";

export const ProductListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get("https://inventory-management-backend.onrender.com/products", {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      })
      .then((res) => {
        dispatch({
          type: PRODUCT_LIST,
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

export const ProductEditAction = (Product_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const ProductEdit = await axios.get(
      `https://inventory-management-backend.onrender.com/products/${Product_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: PRODUCT_EDIT,
      payload: ProductEdit.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const ProductEditDataAction = (data, Product_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  console.log("data=====>", data);

  try {
    const ProductEditData = await axios.put(
      `https://inventory-management-backend.onrender.com/edit/products/${Product_id}`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: PRODUCT_EDIT_DATA,
      payload: ProductEditData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_EDIT_PRODUCT_DATA,
      payload: { data: error.response.data },
    });
  }
};

export const ProductAddAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const ProductAdd = await axios.post(
      "https://inventory-management-backend.onrender.com/products",
      data,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: PRODUCT_ADD,
      payload: ProductAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADD_PRODUCT,
      payload: { data: error.response.data },
    });
  }
};

export const ProductDeleteAction = (Product_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const ProductDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/products/${Product_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: PRODUCT_DELETE,
      payload: ProductDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const ProductDeleteListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get(
        "https://inventory-management-backend.onrender.com/delete/products",
        {
          headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
          params: {
            searchKeyword: data.search,
            limit: data.limit,
            page: data.pageNumber,
            orderByString: data.orderByString,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: PRODUCT_DELETE_LIST,
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
export const PermanentProductDelete = (Product_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const PermanentProductDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/permanent/delete/products/${Product_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: PERMANENT_PRODUCT_DELETE,
      payload: PermanentProductDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_PERMANENT_PRODUCT_DELTETE,
      payload: { data: error.response.data },
    });
  }
};
