import {
  CUSTOMER_LIST,
  LIST_LOADER,
  CUSTOMER_EDIT,
  CUSTOMER_DELETED_LIST,
  CUSTOMER_DELETE,
  CUSTOMER_EDIT_DATA,
  CUSTOMER_ADD,
  FAILED_ADD_CUSTOMER,
  PERMANENT_CUSTOMER_DELETE,
  FAILED_EDIT_CUSTOMERDATA,
} from "../../ActionTypes";

const initialstate = {
  CoustomerList: [],
  loder: true,
  Loader: false,
  customerEdit: [],
  customerDeletedList: [],
  DeletedCustomerLoader: false,
  SucessMessage: [],
  ErrorMessage: [],
  SuccessMessageOfCustomerDeleted: [],
};

const CustomerListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        CoustomerList: action.payload,
        Loader: true,
      };
    case CUSTOMER_LIST:
      return {
        ...state,
        CoustomerList: action.payload,
        customerEdit: [],
        SucessMessage: [],
        ErrorMessage: [],
        SuccessMessageOfCustomerDeleted: [],
        Loader: false,
        loder: true,
      };
    case CUSTOMER_EDIT:
      return {
        ...state,
        customerEdit: action.payload,
        loder: false,
      };
    case CUSTOMER_DELETED_LIST:
      console.log("12345", action.payload);
      return {
        ...state,
        customerDeletedList: action.payload,
        Loader: false,
        DeletedCustomerLoader: true,
      };
    case CUSTOMER_DELETE:
      return {
        ...state,
        SuccessMessageOfCustomerDeleted: action.payload,
      };
    case CUSTOMER_EDIT_DATA:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case FAILED_EDIT_CUSTOMERDATA:
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case CUSTOMER_ADD:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case FAILED_ADD_CUSTOMER:
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case PERMANENT_CUSTOMER_DELETE:
      return {
        ...state,
        SuccessMessageOfCustomerDeleted: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerListReducer;
