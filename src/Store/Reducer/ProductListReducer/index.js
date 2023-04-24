import {
  PRODUCT_LIST,
  LIST_LOADER,
  PRODUCT_EDIT,
  PRODUCT_ADD,
  FAILED_ADD_PRODUCT,
  PRODUCT_DELETE,
  PRODUCT_EDIT_DATA,
  FAILED_EDIT_PRODUCT_DATA,
  PRODUCT_DELETE_LIST,
  PERMANENT_PRODUCT_DELETE,
} from "../../ActionTypes";

const initialstate = {
  Loader: false,
  loder: true,
  productList: [],
  productEdit: [],
  productDeletList: [],
  DeletedProductListLoader: false,
  ErrorMessage: [],
  SucessMessage: [],
  SuccessMessageProductDelete: [],
};

const ProductListReducer = (state = initialstate, action) => {
  console.log("actionpayload=======>", action.payload);
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        productList: action.payload,
        Loader: true,
      };
    case PRODUCT_LIST:
      console.log("actionpayload", action.payload);
      return {
        ...state,
        productList: action.payload,
        productEdit: [],
        SucessMessage: [],
        ErrorMessage: [],
        SuccessMessageProductDelete: [],
        Loader: false,
        loder: true,
      };
    case PRODUCT_EDIT:
      return {
        ...state,
        productEdit: action.payload,
        loder: false,
      };
    case PRODUCT_ADD:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case FAILED_ADD_PRODUCT:
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case PRODUCT_DELETE:
      return {
        ...state,
        SuccessMessageProductDelete: action.payload,
      };
    case PRODUCT_EDIT_DATA:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case FAILED_EDIT_PRODUCT_DATA:
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case PRODUCT_DELETE_LIST:
      return {
        ...state,
        productDeletList: action.payload,
        Loader: false,
        DeletedProductListLoader: true,
      };
    case PERMANENT_PRODUCT_DELETE:
      return {
        ...state,
        SuccessMessageProductDelete: action.payload,
      };
    default:
      return state;
  }
};
export default ProductListReducer;
