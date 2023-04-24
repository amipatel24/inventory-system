import {
  COMPANY_INFO,
  COMPANY_INFO_EDIT,
  FAILED_ADMIN_LIST,
  COMPANY_INFO_BY_ID,
  COMPANY_DELETE,
  FAILED_COMPANY_INFO_EDIT,
} from "../../ActionTypes/index";
import axios from "axios";

export const CompanyInfoAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.get(
      "https://inventory-management-backend.onrender.com/company_info",
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
    );
    dispatch({
      type: COMPANY_INFO,
      payload: CompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const CompanyInfoByIdAction = (company_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.get(
      `https://inventory-management-backend.onrender.com/company_info/${company_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: COMPANY_INFO_BY_ID,
      payload: CompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
// export const CompanyInfoEditAction =
//   (AccessToken, data, company_id) => async (dispatch) => {
//     const token = AccessToken;
//     console.log("CompanyInfoEditAction", data);
//     try {
//       const CompanyInfo = await axios.put(
//         `https://inventory-management-backend.onrender.com/edit/company_info/${company_id}`,
//         data,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       dispatch({
//         type: COMPANY_INFO_EDIT,
//         payload: CompanyInfo.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FAILED_COMPANY_INFO_EDIT,
//         payload: { data: error.response.data },
//       });
//     }
//   };

export const CompanyInfoEditAction = (data, company_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.put(
      `https://inventory-management-backend.onrender.com/edit/company_info/${company_id}`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: COMPANY_INFO_EDIT,
      payload: CompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_COMPANY_INFO_EDIT,
      payload: { data: error.response.data },
    });
  }
};

export const CompanyDeleteAction = (Product_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const ProductDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/company_info/${Product_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: COMPANY_DELETE,
      payload: ProductDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
