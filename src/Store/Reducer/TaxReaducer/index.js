import {
  TAX_LIST,
  TAX_ADD,
  FAILED_TAX_ADD,
  TAX_EDIT,
  TAX_DELETED_LIST,
  TAX_DELETE,
  TAX_INFO_EDIT,
  FAILED_TAX_INFO_EDIT,
  PERMANENT_TAX_DELETE,
  LIST_LOADER,
} from "../../ActionTypes";

const initialstate = {
  TaxList: [],
  TaxEdit: [],
  TaxDeletList: [],
  DeletedTaxLoader: false,
  loder: false,
  ErrorMessage: [],
  SucessMessage: [],
  SuccessDeleteTaxMessage: [],
};

const TaxReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        TaxList: action.payload,
        loder: true,
      };
    case TAX_LIST:
      return {
        ...state,
        TaxList: action.payload,
        TaxEdit: [],
        SucessMessage: [],
        ErrorMessage: [],
        SuccessDeleteTaxMessage: [],
        loder: false,
      };
    case TAX_ADD:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case FAILED_TAX_ADD: {
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    }
    case TAX_EDIT:
      return {
        ...state,
        TaxEdit: action.payload,
        loder: false,
      };
    case TAX_DELETED_LIST:
      return {
        ...state,
        TaxDeletList: action.payload,
        loder: false,
        DeletedTaxLoader: true,
      };
    case TAX_DELETE:
      return {
        ...state,
        SuccessDeleteTaxMessage: action.payload,
      };
    case TAX_INFO_EDIT:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case FAILED_TAX_INFO_EDIT:
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case PERMANENT_TAX_DELETE:
      return {
        ...state,
        SuccessDeleteTaxMessage: action.payload,
      };
    default:
      return state;
  }
};
export default TaxReducer;
