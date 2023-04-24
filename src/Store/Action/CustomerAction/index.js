import {
  CUSTOMER_LIST,
  FAILED_ADMIN_LIST,
  CUSTOMER_EDIT,
  CUSTOMER_DELETED_LIST,
  CUSTOMER_DELETE,
  CUSTOMER_EDIT_DATA,
  FAILED_EDIT_CUSTOMERDATA,
  CUSTOMER_ADD,
  FAILED_ADD_CUSTOMER,
  PERMANENT_CUSTOMER_DELETE,
  FAILED_PERMANENT_CUSTOMER_DELETE,
  LIST_LOADER,
} from "../../ActionTypes/index";
import axios from "axios";

export const CustomerListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get("https://inventory-management-backend.onrender.com/customers", {
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
          type: CUSTOMER_LIST,
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

export const CustomerAddAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CustomerAdd = await axios.post(
      "https://inventory-management-backend.onrender.com/customers",
      data,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: CUSTOMER_ADD,
      payload: CustomerAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADD_CUSTOMER,
      payload: { data: error.response.data },
    });
  }
};

export const CustomerDelectListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get(
        "https://inventory-management-backend.onrender.com/delete/customers",
        {
          headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
          params: data
            ? {
                searchKeyword: data.search ? data.search : null,
                limit: data.limit,
                page: data.pageNumber,
                orderByString: data.orderByString,
              }
            : null,
        }
      )
      .then((res) => {
        dispatch({
          type: CUSTOMER_DELETED_LIST,
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

export const CustomerEditAction = (customers_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  try {
    const ProductEdit = await axios.get(
      `https://inventory-management-backend.onrender.com/customers/${customers_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: CUSTOMER_EDIT,
      payload: ProductEdit.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
// export const CustomerEditDataAction =
//   (AccessToken, data, customers_id) => async (dispatch) => {
//     const token = AccessToken;
//     try {
//       const ProductEditData = await axios.put(
//         `https://inventory-management-backend.onrender.com/edit/customers/${customers_id}`,
//         data,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       dispatch({
//         type: CUSTOMER_EDIT_DATA,
//         payload: ProductEditData.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FAILED_EDIT_CUSTOMERDATA,
//         payload: { data: error.response.data },
//       });
//     }
//   };

export const CustomerEditDataAction = (data, id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  try {
    const ProductEditData = await axios.put(
      `https://inventory-management-backend.onrender.com/edit/customers/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: CUSTOMER_EDIT_DATA,
      payload: ProductEditData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_EDIT_CUSTOMERDATA,
      payload: { data: error.response.data },
    });
  }
};

export const CustomerDeleteAction = (customer_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CustomerDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/customers/${customer_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: CUSTOMER_DELETE,
      payload: CustomerDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const PermanentCustomerDeleteAction = (id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const PermanentCustomerDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/permanent/delete/customers/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: PERMANENT_CUSTOMER_DELETE,
      payload: PermanentCustomerDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_PERMANENT_CUSTOMER_DELETE,
      payload: { data: error.response.data },
    });
  }
};
