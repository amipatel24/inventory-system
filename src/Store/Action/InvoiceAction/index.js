import {
  INVOICE_LIST,
  FAILED_ADMIN_LIST,
  GET_INVOICE_PAGE,
  FAILED_INVOICE_PAGE,
  GET_INVOICE_EDIT_DATA,
  ADD_INVOICE,
  FAILED_ADD_INVOICE,
  GET_DELETED_INVOICE,
  FAILED_GET_DELETED_INVOICE,
  DELETE_INVOICE,
  FAILED_DELETED_INVOICE,
  PARMANENT_DELETE_INVOICE,
  FAILED_PERMANENT_DELETE_INVOICE,
  LIST_LOADER,
  UPDATE_INVOICE_DATA,
  FAILED_UPDATE_INVOICE_DATA,
} from "../../ActionTypes/index";
import axios from "axios";

export const InvoiceListAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get("https://inventory-management-backend.onrender.com/invoicelist", {
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
          type: INVOICE_LIST,
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

export const GetinvoiceAddPageAction = () => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const GetInvoicepageData = await axios.get(
      "https://inventory-management-backend.onrender.com/getinvoicepage",
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: GET_INVOICE_PAGE,
      payload: GetInvoicepageData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_INVOICE_PAGE,
      payload: { data: error.response.data },
    });
  }
};
export const GetinvoiceEditDataAction = (Invoice_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const GetInvoicepageData = await axios.get(
      `https://inventory-management-backend.onrender.com/invoicelistbyid/${Invoice_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: GET_INVOICE_EDIT_DATA,
      payload: GetInvoicepageData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_INVOICE_PAGE,
      payload: { data: error.response.data },
    });
  }
};
export const AddInvoiceData = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const AddInvoiceData = await axios.post(
      "https://inventory-management-backend.onrender.com/addinvoice",
      data,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: ADD_INVOICE,
      payload: AddInvoiceData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADD_INVOICE,
      payload: { data: error.response.data },
    });
  }
};
export const GetDeletedInvoiceList = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get(
        "https://inventory-management-backend.onrender.com/invoiceDeletelist",
        {
          headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
          params: data
            ? {
                searchKeyword: data.search,
                limit: data.limit,
                page: data.pageNumber,
                orderByString: data.orderByString,
              }
            : null,
        }
      )
      .then((res) => {
        dispatch({
          type: GET_DELETED_INVOICE,
          payload: res.data,
        });
      });
  } catch (error) {
    dispatch({
      type: FAILED_GET_DELETED_INVOICE,
      payload: { data: error.response.data },
    });
  }
};
export const DeleteInvoice = (invoice_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const DeleteInvoice = await axios.delete(
      `https://inventory-management-backend.onrender.com/DeleteInvoice/${invoice_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: DELETE_INVOICE,
      payload: DeleteInvoice.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_DELETED_INVOICE,
      payload: { data: error.response.data },
    });
  }
};
export const PermanentDeleteInvoice = (invoice_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const PermanentDeleteInvoice = await axios.delete(
      `https://inventory-management-backend.onrender.com/PermanentDeleteInvoice/${invoice_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: PARMANENT_DELETE_INVOICE,
      payload: PermanentDeleteInvoice.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_PERMANENT_DELETE_INVOICE,
      payload: { data: error.response.data },
    });
  }
};
export const UpdateInvoiceData = (invoice_id, data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const UpdateInvoiceData = await axios.put(
      `https://inventory-management-backend.onrender.com/UpdateInvoiceData/${invoice_id}`,
      data,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: UPDATE_INVOICE_DATA,
      payload: UpdateInvoiceData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_UPDATE_INVOICE_DATA,
      payload: { data: error.response.data },
    });
  }
};
