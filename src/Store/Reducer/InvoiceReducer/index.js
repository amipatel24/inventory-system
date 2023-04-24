import {
  INVOICE_LIST,
  GET_INVOICE_PAGE,
  GET_INVOICE_EDIT_DATA,
  ADD_INVOICE,
  GET_DELETED_INVOICE,
  DELETE_INVOICE,
  PARMANENT_DELETE_INVOICE,
  LIST_LOADER,
  UPDATE_INVOICE_DATA,
} from "../../ActionTypes";

const initialstate = {
  invoiceList: [],
  Loader: false,
  GetInvoicePagData: [],
  invoiceEdit: [],
  InvoicePdf: [],
  DeletedInvoiceList: [],
  DeletedInvoiceLoader: false,
  SucessMessageOfInvoiceDelete: [],
  // SucessMessageOfInvoiceDelete: [],
  // SucessPermanentDeletedData: [],
};

const InvoiceReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        invoiceList: action.payload,
        Loader: true,
      };
    case INVOICE_LIST:
      return {
        ...state,
        invoiceList: action.payload,
        invoiceEdit: [],
        InvoicePdf: [],
        SucessMessageOfInvoiceDelete: [],
        Loader: false,
      };
    case GET_INVOICE_PAGE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        GetInvoicePagData: action.payload,
      };
    case GET_INVOICE_EDIT_DATA:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        invoiceEdit: action.payload,
      };
    case ADD_INVOICE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        InvoicePdf: action.payload,
      };

    case GET_DELETED_INVOICE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        DeletedInvoiceList: action.payload,
        Loader: false,
        DeletedInvoiceLoader: true,
      };
    case DELETE_INVOICE:
      return {
        ...state,
        SucessMessageOfInvoiceDelete: action.payload,
      };
    case PARMANENT_DELETE_INVOICE:
      return {
        ...state,
        SucessMessageOfInvoiceDelete: action.payload,
      };
    case UPDATE_INVOICE_DATA:
      return {
        ...state,
        InvoicePdf: action.payload,
      };
    default:
      return state;
  }
};
export default InvoiceReducer;
